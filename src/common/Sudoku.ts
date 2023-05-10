export class Sudoku {
    private sudoku: number[][];
    // private random: number;

    // 构造函数
    constructor() {
        // this.sudoku = Array(9).fill(Array(9).fill(0));
        this.sudoku = new Array(9).fill(null).map(() => new Array(9).fill(0));
        // this.sudoku = new Array(9).fill(new Array(9).fill(0))
        // console.warn(this.sudoku)
        // this.random = Math.floor(Math.random() * count)
    }

    // 暴露出去的生成数独的函数
    generate() {
        this.clearBoard();
        this.recurBoard(0, 0);
        // return this.sudoku;
    }

    private clearBoard(): void {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.sudoku[i][j] = 0;
            }
        }
    }

    public printBoard(): number[][] {
        for (let i = 0; i < 9; i++) {
            let row = "";
            for (let j = 0; j < 9; j++) {
                row += this.sudoku[i][j] + " ";
            }
            console.log(row);
        }
        return this.sudoku;
    }

    // 遍历格子
    private recurBoard(row: number, col: number): boolean {
        // 遍历完所有格子 生成成功
        if (row == 9) {
            return true;
        }

        // 计算下一个格子的坐标
        const nextRow: number = col == 8 ? row + 1 : row;
        const nextCol: number = col == 8 ? 0 : col + 1;


        // 生成随机数填入当前格子
        const ranArray = this.randomList([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        for (const num of ranArray) {
            if (this.isValid(num, row, col)) {
                this.sudoku[row][col] = num;
                // console.error(`下一坐标${nextRow}--${nextCol}`)
                if (this.recurBoard(nextRow, nextCol)) {
                    return true;
                }
                this.sudoku[row][col] = 0;
            }
        }

        return false;
    }

    // 判断当前格子填的数字是否有效
    private isValid(num: number, row: number, col: number): boolean {
        for (let i: number = 0; i < 9; i++) {
            // console.log(Math.floor(row / 3 * 3 + i / 3), Math.floor(col / 3 * 3 + i % 3))
            // debugger
            if (this.sudoku[row][i] == num || this.sudoku[i][col] == num ||
                this.sudoku[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + (i % 3)] == num) {

                    // this.board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + (i % 3)] == num
                return false;
            }
        }
        return true;
    }

    private randomList(list: Array<number>): Array<number> {
        let res: Array<number> = new Array<number>();
        const n: number = list.length;
        let count: number = n;
        for (let i: number = 0; i < n; i++) {
            const ran: number = Math.floor(Math.random() * count)
            res[i] = list[ran];
            list.splice(ran, 1);
            count--;
        }
        return res;
    }


}
