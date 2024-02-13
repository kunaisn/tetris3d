"use strict";
// ライブラリをモジュールとして読み込む
import * as THREE from "three";
import { GUI } from "gui";
import { OrbitControls } from "orbit";
import { _SRGBAFormat } from "three";
import { getCharW, getCharS, getCharA, getCharD, getGrid } from "gameStage";

class Tetris3D {
    constructor() {
        // シーン作成
        this.scene = new THREE.Scene();

        // 制御変数の定義
        const param = {
            axes: false, // 座標軸
            grid: true, // グリッド
        };

        // 座標軸の設定
        const axes = new THREE.AxesHelper(18);
        this.scene.add(axes);

        // ステージの設定
        const stage = new THREE.Group;

        // 床
        const planeGeometry = new THREE.PlaneGeometry(10, 10);
        const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xdddddd });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.y = -0.1;
        plane.receiveShadow = true;
        stage.add(plane);

        // グリットの描画
        const solidGridLine = getGrid();
        stage.add(solidGridLine);
        this.scene.add(stage);
        this.scene.add(getCharW());
        this.scene.add(getCharS());
        this.scene.add(getCharA());
        this.scene.add(getCharD());

        // 光源の設定
        const spotLight = new THREE.SpotLight();
        spotLight.position.set(10, 10, 10);
        spotLight.castShadow = true;
        this.scene.add(spotLight);
        const spotLight2 = new THREE.SpotLight();
        spotLight2.position.set(-10, 10, -10);
        spotLight2.castShadow = true;
        this.scene.add(spotLight2);

        const gui = new GUI();
        gui.add(param, "axes").name("座標軸");
        gui.add(param, "grid").name("グリッド");
        // スコア
        this.score = 0;
        // 操作するブロックの入れ物
        this.blocks = this.getMoveableBlocks();
        // ゲーム中かどうか
        this.isPlay = false;
        // ブロックが落ちる速度
        this.speed = 0.01;
        this.createBlocksvBlock = new THREE.Vector3();
        // 積んだブロックの管理　当たり判定用
        this.stackBlocksAry = [];
        // 積んだブロックの管理　描画用
        this.stackBlocksList = this.getstackBlocksList();
        for (let i = 0; i < this.stackBlocksList.length; i++) {
            this.scene.add(this.stackBlocksList[i]);
        }

        window.addEventListener("keydown", this.moveBlock, false);
        window.addEventListener("keydown", this.initStage, false);

        // カメラの作成
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / (window.innerHeight * (15 / 16)), 0.1, 1000);
        this.camera.position.set(9, 9, 9);
        this.camera.lookAt(0, 0, 0);

        // レンダラの設定
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, innerHeight * (14 / 16));
        this.renderer.setClearColor(0x808080);
        document.getElementById("output").appendChild(this.renderer.domElement);

        // カメラ制御
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControls.listenToKeyEvents(window);
        this.orbitControls.enableDamping = true;
   
        // 描画関数
        const render = () => {
            solidGridLine.visible = param.grid;
            axes.visible = param.axes;
            // プレイ中か判定
            if (this.isPlay) {
                if (this.isCollosion()) {
                    // 衝突したかつゲーム続行可能ならば、ブロックを積む
                    if (this.isContinue()) {
                        this.stackBlocks();
                        this.collided();
                        this.setScore(this.score);
                        console.log(this.stackBlocksAry);
                    } else {
                        // ゲームが続行不可能であれば、ゲームを終了する
                        this.speed = 0;
                        this.isPlay = false;
                    }
                } else {
                    this.fallBlock();
                }
            }
            // 描画
            this.renderer.render(this.scene, this.camera);
            // 次のフレームでの描画要請
            requestAnimationFrame(render);
        };
        render();
    }

    // ステージを初期化
    initStage = (event) => {
        if (!this.isPlay && event.keyCode == 82) {
            this.stackBlocksAry = [[
                "-2,-2", "-2,-1", "-2,0", "-2,1", "-2,2",
                "-1,-2", "-1,-1", "-1,0", "-1,1", "-1,2",
                "0,-2", "0,-1", "0,0", "0,1", "0,2",
                "1,-2", "1,-1", "1,0", "1,1", "1,2",
                "2,-2", "2,-1", "2,0", "2,1", "2,2"
            ], [], [], [], [], [], [], [], [], [], []];
            for (let i = 0; i < this.stackBlocksList.length; i++) {
                this.scene.remove(this.stackBlocksList[i]);
            }
            this.scene.remove(this.blocks);
            this.stackBlocksList = this.getstackBlocksList();
            for (let i = 0; i < this.stackBlocksList.length; i++) {
                this.scene.add(this.stackBlocksList[i]);
            }

            this.blocks = this.getMoveableBlocks();
            this.scene.add(this.blocks);
            this.speed = 0.01;
            this.score = 0;
            this.isPlay = true;
        }
    }

    // 積まれているブロックを保持する箱を作成
    getstackBlocksList = () => {
        const stackBlocksList = [];
        for (let i = 0; i < 8; i++) {
            stackBlocksList.push(new THREE.Group);
        }
        return stackBlocksList;
    }

    // 落ちている操作可能な複数のブロック
    getMoveableBlocks = () => {
        const moveableBlocks = new THREE.Group();
        // ランダムで7種類の形のどれかを選択する
        let TypeOfBlocks = Math.floor(Math.random() * 6);
        // [x, y, z]の形でブロックの位置を指定する。yはマイナスにならない
        const one = [[0, 0, 0]];
        one.forEach((pos) => {
            const block = this.getOneBlock();
            block.position.x = pos[0];
            block.position.y = pos[1] + 5.5;
            block.position.z = pos[2];
            moveableBlocks.add(block);
        });
        return moveableBlocks;
    }

    // ブロックを一つ作成
    getOneBlock = () => {
        const blockGeometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
        const blockMaterrial = new THREE.MeshLambertMaterial({ color: 0xffff44 });
        const block = new THREE.Mesh(blockGeometry, blockMaterrial);
        block.castShadow = true;
        block.receiveShadow = true;
        return block;
    }

    // スコアを更新
    setScore = (score) => {
        document.getElementById("score").innerText = String(Math.round(score)).padStart(3, "0");
    }

    // 2つ目以降のブロック
    createBlocks = () =>  {
        this.scene.remove(this.blocks);
        this.speed = 0.01;
        this.blocks = this.getMoveableBlocks();
        this.scene.add(this.blocks);
    }

    // 指定時間待つ
    sleep = (time) => {
        let start = new Date();
        while (new Date() - start < time);
    }

    // ブロックの操作
    moveBlock = (event) => {
        if (!this.isPlay) return;
        let move = true;
        let key = event.keyCode;
        if (key === 32 || this.speed === 0.3) {
            this.speed = 0.3;
            return;
        }
        let mx = 0;
        let mz = 0;
        if (key === 87) mz -= 1;
        if (key === 83) mz += 1;
        if (key === 65) mx -= 1;
        if (key === 68) mx += 1;
        this.blocks.children.forEach((block) => {
            if (block.position.z + mz > 2 || block.position.z + mz < -2) move = false;
            if (block.position.x + mx > 2 || block.position.x + mx < -2) move = false;
        });
        if (move) {
            this.blocks.children.forEach((block) => {
                block.position.x += mx;
                block.position.z += mz;
            });
        }
    }

    // 積んだブロックの追加
    stackBlocks = () => {
        this.blocks.children.forEach((block) => {
            const stackBlock = this.getOneBlock();
            stackBlock.position.x = Math.floor(block.position.x);
            stackBlock.position.y =  Math.floor(block.position.y) + 0.5;
            stackBlock.position.z = Math.floor(block.position.z);
            const x = stackBlock.position.x;
            const y = Math.floor(stackBlock.position.y);
            const z = stackBlock.position.z;
            this.stackBlocksList[y].add(stackBlock);
            // 配列に同じものがなければ追加
            let stackStr = x + "," + z;
            if (!this.stackBlocksAry[y + 1].includes(stackStr)) this.stackBlocksAry[y + 1].push(stackStr);
        });
    }

    // 衝突判定
    isCollosion = () => {
        let colFlag = false;
        this.blocks.children.forEach((aBlock) => {
            const x = Math.floor(aBlock.position.x);
            const y = Math.floor(aBlock.position.y + 0.5);
            const z = Math.floor(aBlock.position.z);
            // ブロックの真下に、すでに積まれたブロックがあるか確認する
            if (this.stackBlocksAry[y].includes(x + "," + z)) {
                colFlag = true;
            }
        });
        return colFlag;
    }

    // ゲーム続行判定
    isContinue = () => {
        let conFlag = true;
        this.blocks.children.forEach((block) => {
            const y = Math.floor(block.position.y + 0.5);
            if (y >= 5) {
                conFlag = false;
            }
        });
        return conFlag;
    }

    collided = () => {
        this.blocks.children.forEach((aBlock) => {
            const y = Math.floor(aBlock.position.y + 0.5);
            // ブロックが一面揃っているか判定
            if (this.stackBlocksAry[y + 1].length >= 25) {
                this.sleep(300);
                // 揃った面より上のブロックを消去し、ブロックを一段ずつ下げ再描画する
                for(let i = y; i < 5; i++) {
                    this.scene.remove(this.stackBlocksList[i]);
                    this.stackBlocksList[i] = new THREE.Group;
                    this.scene.add(this.stackBlocksList[i]);
                }
                // 揃った面の当たり判定を消去して、一段ずつ下げる
                this.stackBlocksAry.splice(y + 1, 1);
                this.stackBlocksAry.push([]);
                for (let i = y + 1; i < 6; i++) {
                    for (let j = 0; j < this.stackBlocksAry[i].length; j++) {
                        let str = this.stackBlocksAry[i][j];
                        let sx = Number(str.substring(0, str.indexOf(",")));
                        let sz = Number(str.substring(str.indexOf(",") + 1));
                        this.addBlock(sx, i - 1, sz);
                    }
                }
                score++;
            }
            this.sleep(80);
            this.createBlocks();
        });
    }

    addBlock = (x, y, z) => {
        const stackBlock = this.getOneBlock();
        stackBlock.position.x = x;
        stackBlock.position.y = y;
        stackBlock.position.z = z;
        this.stackBlocksList[y].add(stackBlock);
        this.stackBlocksAry[y + 1].push(x + "," + z);
    }

    // ブロックを落とす
    fallBlock = () => {
        this.blocks.children.forEach((aBlock) => {
            const vBlock = new THREE.Vector3();
            vBlock.set(0, -1, 0)
            aBlock.position.addScaledVector(vBlock, this.speed);
        });
    }
}

const tetris3d = new Tetris3D();
