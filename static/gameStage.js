import * as THREE from "three";

// 文字「W、A、S、D」の追加
const charLineGeometry = new THREE.PlaneGeometry(1.5, 0.3);
const charShortLineGeometry = new THREE.PlaneGeometry(1, 0.3);
const charLongLineGeometry = new THREE.PlaneGeometry(2, 0.3);
const charLineMaterial = new THREE.LineBasicMaterial({ color: 0x222222 });

// 「W」の文字
export function getCharW() {
    const charGroup = new THREE.Group;
    {
        const charLine = new THREE.Mesh(charLineGeometry, charLineMaterial);
        charLine.rotation.x = -0.5 * Math.PI;
        charLine.rotation.z = 0.65 * Math.PI;
        charLine.position.y = 0;
        charLine.position.z = -3.6;
        charLine.position.x = -0.9;
        charGroup.add(charLine);
    }
    {
        const charLine = new THREE.Mesh(charLineGeometry, charLineMaterial);
        charLine.rotation.x = -0.5 * Math.PI;
        charLine.rotation.z = 0.35 * Math.PI;
        charLine.position.y = 0;
        charLine.position.z = -3.7;
        charLine.position.x = -0.25;
        charGroup.add(charLine);
    }
    {
        const charLine = new THREE.Mesh(charLineGeometry, charLineMaterial);
        charLine.rotation.x = -0.5 * Math.PI;
        charLine.rotation.z = 0.65 * Math.PI;
        charLine.position.y = 0;
        charLine.position.z = -3.7;
        charLine.position.x = 0.25;
        charGroup.add(charLine);
    }
    {
        const charLine = new THREE.Mesh(charLineGeometry, charLineMaterial);
        charLine.rotation.x = -0.5 * Math.PI;
        charLine.rotation.z = 0.35 * Math.PI;
        charLine.position.y = 0;
        charLine.position.z = -3.6;
        charLine.position.x = 0.9;
        charGroup.add(charLine);
    }
    return charGroup;
}

// 「S」の文字
export function getCharS() {
    const charGroup = new THREE.Group;
    {
        const charLine = new THREE.Mesh(charLineGeometry, charLineMaterial);
        charLine.rotation.x = -0.5 * Math.PI;
        charLine.position.y = 0;
        charLine.position.z = 3.0;
        charGroup.add(charLine);
    }
    {
        const charLine = new THREE.Mesh(charLineGeometry, charLineMaterial);
        charLine.rotation.x = -0.5 * Math.PI;
        charLine.position.y = 0;
        charLine.position.z = 3.8;
        charGroup.add(charLine);
    }
    {
        const charLine = new THREE.Mesh(charLineGeometry, charLineMaterial);
        charLine.rotation.x = -0.5 * Math.PI;
        charLine.position.y = 0;
        charLine.position.z = 4.7;
        charGroup.add(charLine);
    }
    {
        const charLine = new THREE.Mesh(charShortLineGeometry, charLineMaterial);
        charLine.rotation.x = -0.5 * Math.PI;
        charLine.rotation.z = 0.5 * Math.PI;
        charLine.position.y = 0;
        charLine.position.z = 3.4;
        charLine.position.x = -0.6;
        charGroup.add(charLine);
    }
    {
        const charLine = new THREE.Mesh(charShortLineGeometry, charLineMaterial);
        charLine.rotation.x = -0.5 * Math.PI;
        charLine.rotation.z = 0.5 * Math.PI;
        charLine.position.y = 0;
        charLine.position.z = 4.2;
        charLine.position.x = 0.6;
        charGroup.add(charLine);
    }
    return charGroup;
}

// 「A」の文字
export function getCharA() {
    const charGroup = new THREE.Group;
    {
        const charLine = new THREE.Mesh(charLongLineGeometry, charLineMaterial);
        charLine.rotation.x = -0.5 * Math.PI;
        charLine.rotation.z = 0.65 * Math.PI;
        charLine.position.y = 0;
        charLine.position.x = -3.3;
        charGroup.add(charLine);
    }
    {
        const charLine = new THREE.Mesh(charLongLineGeometry, charLineMaterial);
        charLine.rotation.x = -0.5 * Math.PI;
        charLine.rotation.z = 0.35 * Math.PI;
        charLine.position.y = 0;
        charLine.position.x = -4.1;
        charGroup.add(charLine);
    }
    {
        const charLine = new THREE.Mesh(charShortLineGeometry, charLineMaterial);
        charLine.rotation.x = -0.5 * Math.PI;
        charLine.position.y = 0;
        charLine.position.x = -3.7;
        charLine.position.z = 0.2;
        charGroup.add(charLine);
    }
    return charGroup;
}

// 「D」の文字
export function getCharD() {
    const charGroup = new THREE.Group;
    {
        const charLine = new THREE.Mesh(charLongLineGeometry, charLineMaterial);
        charLine.rotation.x = -0.5 * Math.PI;
        charLine.rotation.z = 0.5 * Math.PI;
        charLine.position.y = 0;
        charLine.position.x = 3.2;
        charGroup.add(charLine);
    }
    {
        const charLine = new THREE.Mesh(charShortLineGeometry, charLineMaterial);
        charLine.rotation.x = -0.5 * Math.PI;
        charLine.rotation.z = 0.2 * Math.PI;
        charLine.position.y = 0;
        charLine.position.z = 0.65;
        charLine.position.x = 3.6;
        charGroup.add(charLine);
    }
    {
        const charLine = new THREE.Mesh(charShortLineGeometry, charLineMaterial);
        charLine.rotation.x = -0.5 * Math.PI;
        charLine.rotation.z = -0.2 * Math.PI;
        charLine.position.y = 0;
        charLine.position.z = -0.65;
        charLine.position.x = 3.6;
        charGroup.add(charLine);
    }
    {
        const charLine = new THREE.Mesh(charShortLineGeometry, charLineMaterial);
        charLine.rotation.x = -0.5 * Math.PI;
        charLine.rotation.z = 0.5 * Math.PI;
        charLine.position.y = 0;
        charLine.position.x = 4.0;
        charGroup.add(charLine);
    }
    return charGroup;
}

// グリッドの描画
export function getGrid() {
    // グリットの描画
    const solidGridLine = new THREE.Group;
    // Y軸の面
    for (let k = 0; k < 2; k++) {
        const flatGlidLine = new THREE.Group;
        for (let i = 0; i <= 5; i++) {
            const lineGeometry = new THREE.PlaneGeometry(5, 0.02);
            const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
            const lineX = new THREE.Mesh(lineGeometry, lineMaterial);
            lineX.rotation.x = -0.5 * Math.PI;
            lineX.position.z = 2.5 - i;
            lineX.receiveShadow = true;
            flatGlidLine.add(lineX);
            const lineZ = new THREE.Mesh(lineGeometry, lineMaterial);
            lineZ.rotation.y = 0.5 * Math.PI;
            lineZ.position.x = 2.5 - i;
            lineZ.receiveShadow = true;
            flatGlidLine.add(lineZ);
        }
        flatGlidLine.position.y = k * 5;
        solidGridLine.add(flatGlidLine);
    }
    // Z軸の面
    for (let k = 0; k < 2; k++) {
        const flatGlidLine = new THREE.Group;
        for (let i = 1; i < 5; i++) {
            const lineGeometry = new THREE.PlaneGeometry(5, 0.02);
            const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
            const lineX = new THREE.Mesh(lineGeometry, lineMaterial);
            lineX.rotation.z = -0.5 * Math.PI;
            lineX.position.x = 2.5 - i;
            lineX.position.y = 2.5;
            lineX.position.z = -2.5;
            lineX.receiveShadow = true;
            flatGlidLine.add(lineX);
            const lineY = new THREE.Mesh(lineGeometry, lineMaterial);
            lineY.position.y = 5 - i;
            lineY.position.z = -2.5;
            lineY.receiveShadow = true;
            flatGlidLine.add(lineY);
        }
        flatGlidLine.position.z = k * 5;
        solidGridLine.add(flatGlidLine);
    }
    // X軸の面
    for (let k = 0; k < 2; k++) {
        const flatGlidLine = new THREE.Group;
        for (let i = 1; i < 5; i++) {
            const lineGeometry = new THREE.PlaneGeometry(5, 0.02);
            const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
            const lineX = new THREE.Mesh(lineGeometry, lineMaterial);
            lineX.rotation.z = -0.5 * Math.PI;

            lineX.position.z = 2.5 - i;
            lineX.position.y = 2.5;
            lineX.position.x = -2.5;

            lineX.receiveShadow = true;
            flatGlidLine.add(lineX);

            const lineY = new THREE.Mesh(lineGeometry, lineMaterial);
            lineY.rotation.y = 0.5 * Math.PI;
            lineY.position.y = 5 - i;
            lineY.position.x = -2.5;
            lineY.receiveShadow = true;
            flatGlidLine.add(lineY);
        }
        flatGlidLine.position.x = k * 5;
        solidGridLine.add(flatGlidLine);
    }
    return solidGridLine
}

