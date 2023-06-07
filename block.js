import * as THREE from "three";

export function makeBlocks() {
    const blocks = new THREE.Group();
    const blockGeometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
    const blockMaterrial = new THREE.MeshLambertMaterial({ color: 0xffff44});
    for(let i=0; i<3; i++) {
        const block = new THREE.Mesh(blockGeometry, blockMaterrial);
        block.position.x = i - 1;
        block.position.y = 6;
        blocks.add(block);
    }
    return blocks;
}