import {IDifficulty} from './interfaces/difficulty.interface';

export const difficulties: IDifficulty[] = [
    {
        id: 1,
        name: 'Easy',
        icon: 'assets/images/game/easy.svg',
        iconSelected: 'assets/images/game/easy-active.svg',
        isSelected: false
    },
    {
        id: 2,
        name: 'Medium',
        icon: 'assets/images/game/medium.svg',
        iconSelected: 'assets/images/game/medium-active.svg',
        isSelected: true
    },
    {
        id: 3,
        name: 'Hard',
        icon: 'assets/images/game/hard.svg',
        iconSelected: 'assets/images/game/hard-active.svg',
        isSelected: false
    }
];
