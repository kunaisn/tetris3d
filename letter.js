import * as THREE from "three";

// 床に描写する文字（W,A,S,D）を戻す

const charLineGeometry = new THREE.PlaneGeometry(1.5, 0.3);
const charShortLineGeometry = new THREE.PlaneGeometry(1, 0.3);
const charLongLineGeometry = new THREE.PlaneGeometry(2, 0.3);
const charLineMaterial = new THREE.LineBasicMaterial( { color: 0x222222 } );

// 「W」の文字
export function createCharW() {
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
export function createCharS() {
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
export function createCharA() {
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

export function createCharD() {
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