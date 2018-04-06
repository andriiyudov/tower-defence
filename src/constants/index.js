export const randomIntNumbers = (min, max, count = 1) => {
    let randNumbers;

    if (count > 1) {
        randNumbers = new Array(count).fill(null).map(() => Math.floor(Math.random() * (max - min)) + min);
    } else {
        randNumbers = Math.floor(Math.random() * (max - min)) + min;
    }

    return randNumbers;
}

export const difficultParams = {
    'easy': {
        playerSet: {
            damage: 15,
            bulletSpeed: 10,
            bulletRadius: 15,
        },
        enemySet: {
            damage: 10,
            speed: 50,
            hp: 20,

            delay: 2000,
        },
        enemiesCount: 20,
    },
}

