const north = [0,0,0]
const south = [0, Math.PI, 0];
const east = [0, -Math.PI / 2, 0];
const west = [0, Math.PI / 2, 0];

const PhotoLibrary = {
    1: { 
        position: [-9.4, 3.7, 12.4], 
        rotation: south, 
        frameThickness: 0.15, 
        frameMargin: 0.35, 
        scaleMultiplier: 0.7,
        src: "/images/alicante-1 Large.jpeg"
    },
    2: { 
        position: [-5, 3.8, 12.4], 
        rotation: south, 
        frameThickness: 0.15, 
        frameMargin: 0.4, 
        scaleMultiplier: 1.8,
        src: "/images/japan-es-shanghai-3 Large.jpeg"
    },
    3: { 
        position: [-12.4, 2.8, 8.5], 
        rotation: west, 
        frameThickness: 0.1, 
        frameMargin: 0.1, 
        scaleMultiplier: 1,
        src: "/images/japan-es-shanghai-10 Large.jpeg"
    },
    4: { 
        position: [-12.4, 5.4, 8.5], 
        rotation: west, 
        frameThickness: 0.1, 
        frameMargin: 0.1, 
        scaleMultiplier: 1,
        src: "/images/japan-es-shanghai-6 Large.jpeg"
    },
    7: { 
        position: [7, 4, 12.4], 
        rotation: south, 
        frameThickness: 0.15, 
        frameMargin: 0.5, 
        scaleMultiplier: 1.8,
        src: "/images/japan-es-shanghai-15 Large.jpeg"
    },
    8: { 
        position: [-12.4, 5, -10], 
        rotation: west, 
        frameThickness: 0.07, 
        frameMargin: 0.2, 
        scaleMultiplier: 0.4,
        src: "/images/istanbul-1 Large.jpeg"
    },
    9: { 
        position: [-12.4, 5, -8], 
        rotation: west, 
        frameThickness: 0.07, 
        frameMargin: 0.2, 
        scaleMultiplier: 0.4,
        src: "/images/japan-es-shanghai-8 Large.jpeg"
    },
    10: { 
        position: [-12.4, 5, -6], 
        rotation: west, 
        frameThickness: 0.07, 
        frameMargin: 0.2, 
        scaleMultiplier: 0.4,
        src: "/images/istanbul-3 Large.jpeg"
    },
    11: { 
        position: [-12.4, 5, -4], 
        rotation: west, 
        frameThickness: 0.07, 
        frameMargin: 0.2, 
        scaleMultiplier: 0.4,
        src: "/images/istanbul-4 Large.jpeg"
    },
    12: { 
        position: [-12.4, 5, -2], 
        rotation: west, 
        frameThickness: 0.07, 
        frameMargin: 0.2, 
        scaleMultiplier: 0.4,
        src: "/images/japan-es-shanghai-13 Large.jpeg"
    },
    13: { 
        position: [-12.4, 5, 0], 
        rotation: west, 
        frameThickness: 0.07, 
        frameMargin: 0.2, 
        scaleMultiplier: 0.4,
        src: "/images/istanbul-6 Large.jpeg"
    },
    14: { 
        position: [12.4, 3, -1], 
        rotation: east, 
        frameThickness: 0.1, 
        frameMargin: 0.3, 
        scaleMultiplier: 0.5,
        src: "/images/kenya-1 Large.jpeg"
    },
    15: { 
        position: [12.4, 5.2, 2], 
        rotation: east, 
        frameThickness: 0.1, 
        frameMargin: 0.3, 
        scaleMultiplier: 0.5,
        src: "/images/kenya-2 Large.jpeg"
    },
    16: { 
        position: [12.4, 5.2, 5], 
        rotation: east, 
        frameThickness: 0.1, 
        frameMargin: 0.3, 
        scaleMultiplier: 0.5,
        src: "/images/kenya-3 Large.jpeg"
    },
    17: { 
        position: [12.4, 5.2, -1], 
        rotation: east, 
        frameThickness: 0.1, 
        frameMargin: 0.3, 
        scaleMultiplier: 0.5,
        src: "/images/kenya-4 Large.jpeg"
    },
    18: { 
        position: [0, 3.8, -12.4], 
        rotation: north, 
        frameThickness: 0.15, 
        frameMargin: 0.5, 
        scaleMultiplier: 2.5,
        src: "/images/kenya-5 Large.jpeg"
    },
    19: { 
        position: [12.4, 5.5, 10], 
        rotation: east, 
        frameThickness: 0.1, 
        frameMargin: 0.4, 
        scaleMultiplier: 0.8,
        src: "/images/kenya-6 Large.jpeg"
    },
    20: { 
        position: [12.4, 2.5, 10], 
        rotation: east, 
        frameThickness: 0.1, 
        frameMargin: 0.4, 
        scaleMultiplier: 0.8,
        src: "/images/kenya-7 Large.jpeg"
    },
    21: { 
        position: [12.4, 3, 2], 
        rotation: east, 
        frameThickness: 0.1, 
        frameMargin: 0.3, 
        scaleMultiplier: 0.5,
        src: "/images/kenya-8 Large.jpeg"
    },
    22: { 
        position: [12.4, 3, 5], 
        rotation: east, 
        frameThickness: 0.1, 
        frameMargin: 0.3, 
        scaleMultiplier: 0.5,
        src: "/images/kenya-9 Large.jpeg"
    },
    23: { 
        position: [12.4, 4, -8], 
        rotation: east, 
        frameThickness: 0.15, 
        frameMargin: 0.5, 
        scaleMultiplier: 2,
        src: "/images/cph-3 Large.jpeg"
    },
    
};

export default PhotoLibrary