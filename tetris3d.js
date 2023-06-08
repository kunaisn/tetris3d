// ライブラリをモジュールとして読み込む
import * as THREE from "three";
import { GUI } from "gui";
import {OrbitControls} from "orbit";
import { _SRGBAFormat } from "three";
import { makeCharW, makeCharS, makeCharA, makeCharD, makeGrid } from "letter";

// ３Ｄページ作成関数の定義
function init() {
  // 制御変数の定義
  const param = {
    axes: true, // 座標軸
    grid: true, // グリッド
  };

  // GUIコントローラの設定
  const gui = new GUI();
  gui.add(param, "axes").name("座標軸");
  gui.add(param, "grid").name("グリッド");

  // シーン作成
  const scene = new THREE.Scene();

  // 座標軸の設定
  const axes = new THREE.AxesHelper(18);
  scene.add(axes);

  // スコア
  let score = 0;
  function setScore(score) {
    document.getElementById("score").innerText
    = String(Math.round(score)).padStart(3, "0");
  }

  // ステージの設定
  const stage = new THREE.Group;
  // 床
  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xdddddd});
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -0.1;
  plane.receiveShadow = true;
  stage.add(plane);
  
  // グリットの描画
  const solidGridLine = makeGrid();
  stage.add(solidGridLine);
  scene.add(stage);

  // 文字「W、A、S、D」の追加
  scene.add(makeCharW());
  scene.add(makeCharS());
  scene.add(makeCharA());
  scene.add(makeCharD());

  // 光源の設定
  const spotLight = new THREE.SpotLight();
  spotLight.position.set(10, 10, 10);
  spotLight.castShadow = true;
  scene.add(spotLight);
  const spotLight2 = new THREE.SpotLight();
  spotLight2.position.set(-10, 10, -10);
  spotLight2.castShadow = true;
  scene.add(spotLight2);

  // 操作するブロックの入れ物
  let blocks;

  // 2つ目以降のブロック
  function createBlocks() {
    scene.remove(blocks);
    speed = 0.01;
    blocks = makeBlocks();
    scene.add(blocks);
  }

   // 落ちている操作可能な複数のブロック
  function makeBlocks() {
    const blocks = new THREE.Group();
    const blockGeometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
    const blockMaterrial = new THREE.MeshLambertMaterial({ color: 0xffff44});
    // ランダムで7種類の形のどれかを選択する
    let fallBlockType = Math.floor(Math.random() * 6);
    switch(fallBlockType) {
      case 0:
        let XorZ = Math.floor(Math.random() * 2);
        if(XorZ == 0) {
          for(let i=0; i<4; i++) {
            const block = new THREE.Mesh(blockGeometry, blockMaterrial);
            block.position.x = i - 1;
            block.position.y = 6;
            block.castShadow = true;
            block.receiveShadow = true;
            blocks.add(block);
          }
        } else {
          for(let i=0; i<4; i++) {
            const block = new THREE.Mesh(blockGeometry, blockMaterrial);
            block.position.z = i - 1;
            block.position.y = 6;
            block.castShadow = true;
            block.receiveShadow = true;
            blocks.add(block);
          }
        }
        break;
      case 1:
        for(let i=0; i<3; i++) {
          const block = new THREE.Mesh(blockGeometry, blockMaterrial);
          block.position.x = i - 1;
          block.position.y = 6;
          block.castShadow = true;
          block.receiveShadow = true;
          blocks.add(block);
        }
        break;
      case 2:
        for(let i=0; i<3; i++) {
          const block = new THREE.Mesh(blockGeometry, blockMaterrial);
          block.position.z = i - 1;
          block.position.y = 6;
          block.castShadow = true;
          block.receiveShadow = true;
          blocks.add(block);
        }
        break;
      case 3:
        for(let i=0; i<2; i++) {
          const block = new THREE.Mesh(blockGeometry, blockMaterrial);
          block.position.z = i;
          block.position.y = 6;
          block.castShadow = true;
          block.receiveShadow = true;
          blocks.add(block);
        }
        break;
      case 4:
        for(let i=0; i<2; i++) {
          const block = new THREE.Mesh(blockGeometry, blockMaterrial);
          block.position.x = i;
          block.position.y = 6;
          block.castShadow = true;
          block.receiveShadow = true;
          blocks.add(block);
        }
        break;
      case 5:
        for(let i=0; i<1; i++) {
          const block = new THREE.Mesh(blockGeometry, blockMaterrial);
          block.position.y = 6;
          block.castShadow = true;
          block.receiveShadow = true;
          blocks.add(block);
        }
        break;
      default:
    }
    return blocks;
  }
  
  // 落ちた後のブロックを表示するために使用
  function makeBlock() {
    const blockGeometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
    const blockMaterrial = new THREE.MeshLambertMaterial({ color: 0xffff44});
    const block = new THREE.Mesh(blockGeometry, blockMaterrial);
    block.castShadow = true;
    block.receiveShadow = true;
    return block;
  }

  // ゲーム中かどうか
  let isPlay = false;

  // 積まれたブロック　実際に描画されるもの
  let stackBlocksGroup = new THREE.Group;
  let stackBlocks1 = new THREE.Group;
  let stackBlocks2 = new THREE.Group;
  let stackBlocks3 = new THREE.Group;
  let stackBlocks4 = new THREE.Group;
  let stackBlocks5 = new THREE.Group;
  const stackBlocks6 = new THREE.Group;
  stackBlocksGroup.add(stackBlocks1);
  stackBlocksGroup.add(stackBlocks2);
  stackBlocksGroup.add(stackBlocks3);
  stackBlocksGroup.add(stackBlocks4);
  stackBlocksGroup.add(stackBlocks5);
  scene.add(stackBlocksGroup);

  // 積んだブロックの管理　当たり判定用
  let stackBlocksAry = [
    [
    "-2,-2", "-2,-1","-2,0","-2,1","-2,2",
    "-1,-2","-1,-1","-1,0","-1,1","-1,2",
    "0,-2","0,-1","0,0", "0,1", "0,2",
    "1,-2","1,-1", "1,0", "1,1", "1,2",
    "2,-2","2,-1", "2,0", "2,1", "2,2"
  ],
    [],
    [],
    [],
    [],
    [],
    []
  ];

  // 積んだブロックの追加
  function addBlock(x, y, z) {
    const deadBlock = makeBlock();
    deadBlock.position.x = x;
    deadBlock.position.y = y + 0.5;
    deadBlock.position.z = z;
    switch(y + 1) {
      case 1:
        stackBlocks1.add(deadBlock);
        break;
      case 2:
        stackBlocks2.add(deadBlock);
        break;
      case 3:
        stackBlocks3.add(deadBlock);
        break;
      case 4:
        stackBlocks4.add(deadBlock);
        break;
      case 5:
        stackBlocks5.add(deadBlock);
        break;
      default:
    }
    // 配列に同じものがなければ追加
    let str = x + "," + z;
    if(!stackBlocksAry[y + 1].includes(str)) stackBlocksAry[y + 1].push(str);
  }

  // 衝突判定
  function isCollosion(aBlock) {
    let x = Math.floor(aBlock.position.x);
    let y = Math.floor(aBlock.position.y + 0.5);
    let z = Math.floor(aBlock.position.z);
    // ブロックの真下に、すでに積まれたブロックがあるか確認する
    if(stackBlocksAry[y].includes(x + "," + z)) {
      // もし、5段目より高い場合、ゲームが終わる
      if(y < 5) {
        blocks.children.forEach((block) => {
          let xC = Math.floor(block.position.x);
          let yC = Math.floor(block.position.y + 0.5);
          let zC = Math.floor(block.position.z);
          //　yが6のブロックを無視するため
          if(yC !== 6) addBlock(xC, yC, zC);
        });
        // ブロックが一面揃っているか判定
        if(stackBlocksAry[y + 1].length >= 25) {
          sleep(300);
          // 揃った面より上のブロックを消去し、ブロックを一段ずつ下げ再描画する
          switch(y + 1) {
            case 1:
              stackBlocksGroup.remove(stackBlocks1);
              stackBlocks1 = stackBlocks6.clone();
              stackBlocksGroup.add(stackBlocks1);
            case 2:
              stackBlocksGroup.remove(stackBlocks2);
              stackBlocks2 = stackBlocks6.clone();
              stackBlocksGroup.add(stackBlocks2);
            case 3:
              stackBlocksGroup.remove(stackBlocks3);
              stackBlocks3 = stackBlocks6.clone();
              stackBlocksGroup.add(stackBlocks3);
            case 4:
              stackBlocksGroup.remove(stackBlocks4);
              stackBlocks4 = stackBlocks6.clone();
              stackBlocksGroup.add(stackBlocks4);
            case 5:
              stackBlocksGroup.remove(stackBlocks5);
              stackBlocks5 = stackBlocks6.clone();
              stackBlocksGroup.add(stackBlocks5);
              break;
            default:
          }
          // 揃った面の当たり判定を消去して、一段ずつ下げる
          stackBlocksAry.splice(y + 1, 1);
          stackBlocksAry.push([]);
          for(let i=y+1; i<6; i++) {
            let len = stackBlocksAry[i].length;
            for(let j=0; j<len; j++) {
              let str = stackBlocksAry[i][j];
              let sx = Number(str.substring(0, str.indexOf(",")));
              let sz = Number(str.substring(str.indexOf(",") + 1));
              addBlock(sx, i-1, sz);
              console.log(str);
            }
          }
          score++;
        }
        sleep(100);
        createBlocks();
      } else {
        speed = 0;
        isPlay = false;
      }
    }
  }

  // 指定時間待つ
  function sleep(time) {
    let start = new Date();
    while(new Date() - start < time);
  }

  // ブロックを一定速度で落とす
  let speed = 0.01;
  const vBlock = new THREE.Vector3();
  function fallBlock(aBlock) {
    vBlock.set(0, -1, 0)
    aBlock.position.addScaledVector(vBlock, speed);
  }

  // ステージを初期化
  function deleteStage() {
    stackBlocksAry = [[
      "-2,-2", "-2,-1","-2,0","-2,1","-2,2",
      "-1,-2","-1,-1","-1,0","-1,1","-1,2",
      "0,-2","0,-1","0,0", "0,1", "0,2",
      "1,-2","1,-1", "1,0", "1,1", "1,2",
      "2,-2","2,-1", "2,0", "2,1", "2,2"
    ],[],[],[],[],[],[]];
    scene.remove(stackBlocksGroup);
    scene.remove(blocks);
    stackBlocksGroup = new THREE.Group;
    stackBlocks1 = new THREE.Group;
    stackBlocks2 = new THREE.Group;
    stackBlocks3 = new THREE.Group;
    stackBlocks4 = new THREE.Group;
    stackBlocks5 = new THREE.Group;
    stackBlocksGroup.add(stackBlocks1);
    stackBlocksGroup.add(stackBlocks2);
    stackBlocksGroup.add(stackBlocks3);
    stackBlocksGroup.add(stackBlocks4);
    stackBlocksGroup.add(stackBlocks5);
    scene.add(stackBlocksGroup);

    blocks = makeBlocks();
    scene.add(blocks);
    speed = 0.01;
    score = 0;
    isPlay = true;
  }

  // ブロックの操作
  function moveBlock(event) {
    console.log(event.keyCode);
    let move = true;
    let key = event.keyCode;
    if(key === 32 || speed === 0.3) {
      speed = 0.3;
      return;
    }
    let mx = 0;
    let mz = 0;
    if(key === 87) mz -= 1;
    if(key === 83) mz += 1;
    if(key === 65) mx -= 1;
    if(key === 68) mx += 1;
    blocks.children.forEach((block) => {
      if( block.position.z + mz > 2 ||
        block.position.z + mz < -2 ) move = false;
      if( block.position.x + mx > 2 ||
        block.position.x + mx < -2 ) move = false;
    });
    if(move) {
      blocks.children.forEach((block) => {
        block.position.x += mx;
        block.position.z += mz;
      });
    }
  }
  window.addEventListener("keydown", moveBlock, false);

  // マウスクリックでスタート
  function startGame(event) {
    if (!isPlay && event.keyCode == 82) deleteStage(); 
  }
  window.addEventListener("keydown", startGame, false);

  // カメラの作成
  const camera = new THREE.PerspectiveCamera(
    50, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(9,9,9);
  camera.lookAt(0,0,0);

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, innerHeight);
  renderer.setClearColor(0x808080);
  document.getElementById("output").appendChild(renderer.domElement);

  // カメラ制御
  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.listenToKeyEvents( window );
  orbitControls.enableDamping =true;

  // 描画処理

  // 描画関数
  function render() {
    // 座標軸の表示
    axes.visible = param.axes;
    solidGridLine.visible = param.grid;
    if(isPlay) {
      blocks.children.forEach((block) => {
        isCollosion(block);
        fallBlock(block);
      });
      setScore(score);
    }
    // 描画
    renderer.render(scene, camera);
    // 次のフレームでの描画要請
    requestAnimationFrame(render);
  }

  // 描画開始
  render();
}

init();
