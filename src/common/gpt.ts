class Random {
    private seed: number;

    constructor(seed: number) {
        this.seed = seed;
    }

    public nextInt(n: number): number {
        const x = Math.sin(this.seed++) * 10000;
        return Math.floor((x - Math.floor(x)) * n);
    }
}


export class SudokuGenerator {
    private board: number[][];
    private rand;

    constructor() {
        this.board = new Array(9).fill(null).map(() => new Array(9).fill(0));
        // this.rand = new Random();
        this.rand = Math.random;
    }

    public generate(): void {
        this.clearBoard();
        this.generateRecursively(0, 0);
    }

    private clearBoard(): void {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.board[i][j] = 0;
            }
        }
    }

    private generateRecursively(row: number, col: number): boolean {
        // 遍历完所有格子，生成成功
        if (row == 9) {
            return true;
        }

        // 计算下一个格子的行列坐标
        const nextRow = col == 8 ? row + 1 : row;
        const nextCol = col == 8 ? 0 : col + 1;

        // 生成随机数填入当前格子
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.shuffle(nums);
        for (const num of nums) {
            if (this.isValid(num, row, col)) {
                this.board[row][col] = num;
                if (this.generateRecursively(nextRow, nextCol)) {
                    return true;
                }
                this.board[row][col] = 0;
            }
        }

        // 所有数字都尝试过了，无法生成数独
        return false;
    }

    private shuffle(arr: number[]): void {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    private isValid(num: number, row: number, col: number): boolean {
        // 判断在当前行、列、宫是否有重复的数字
        for (let i = 0; i < 9; i++) {
            if (
                this.board[row][i] == num ||
                this.board[i][col] == num ||
                this.board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + (i % 3)] == num
            ) {
                return false;
            }
        }
        return true;
    }

    public getBoard(): number[][] {
        return this.board;
    }

    public printBoard(): void {
        for (let i = 0; i < 9; i++) {
            let row = "";
            for (let j = 0; j < 9; j++) {
                row += this.board[i][j] + " ";
            }
            console.log(row);
        }
    }
}

//   const generator = new SudokuGenerator();
//   generator.generate();
//   generator.printBoard();



