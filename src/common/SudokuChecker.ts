export class SudokuChecker {
    private static GRID_SIZE: number = 9;
    private static symmetricalPosition: number[] = [-1, -1];

    constructor() {

    }

    private static isUnique(grid: number[][]): boolean {
        return this.backtrack(grid, 0, 0);
    }

    private static backtrack(grid: number[][], row: number, col: number): boolean {
        if (col == this.GRID_SIZE) {
            col = 0;
            row++;
            if (row == this.GRID_SIZE) {
                return true;
            }
        }
        if (grid[row][col] != 0) {
            return this.backtrack(grid, row, col + 1);
        }

        // 方格为空，尝试填入数字
        for (let i: number = 1; i <= this.GRID_SIZE; i++) {
            if (this.isValid(grid, row, col, i)) {
                grid[row][col] = i;
                if (this.backtrack(grid, row, col + 1)) {
                    return true;
                }

                grid[row][col] = 0;

            }
        }


        return false;
    }

    // 验证唯一性
    private static isValid(grid: number[][], row: number, col: number, val: number): boolean {
        for (let i = 0; i < this.GRID_SIZE; i++) {
            if (grid[row][i] == val || grid[i][col] == val ||
                grid[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + (i % 3)] == val) {
                return false;
            }
        }
        return true;
    }


    /*
        随机删除某个数字
        控制每行、每列、每个九宫格空缺的数量
    
    */

    private static removeRandom(grid: number[][], target: number): number[][] {
        // console.log("执行了removeRandom")
        // 如果到达了规定的删除数量 返回
        if (target == 0) {
            return grid;
        }

        // 获取随机数,如果当前位置的值已经为0，重新roll一个
        // TODO可能有必要存储已经roll过的值，减少递归次数，如何使格子均分

        // 1. 使用对称位置
        // console.log(this.symmetricalPosition);
        let row: number;
        let col: number;
        // let row: number = Math.floor(Math.random() * 9);
        // let col: number = Math.floor(Math.random() * 9);

        if (this.symmetricalPosition[0] === -1 || this.symmetricalPosition[0] === this.symmetricalPosition[1]) {
            // 当数组未被初始化，或对称位置已经使用
            row = Math.floor(Math.random() * 9);
            col = Math.floor(Math.random() * 9);
            this.symmetricalPosition[0] = row;
            this.symmetricalPosition[1] = col;
        }
        else {
            // row = 8 - this.symmetricalPosition[0];
            // col = 8 - this.symmetricalPosition[1];

            row = this.symmetricalPosition[1];
            col = this.symmetricalPosition[0];

            this.symmetricalPosition = [-1, -1]
        }





        // console.log(row, col)
        // console.log(col)

        // 保存被删除的数
        const tem = grid[row][col];
        // 删除
        grid[row][col] = 0;
        // console.log(grid,tem)
        const newArray = grid.map(subArray => [...subArray]);

        // 验证唯一性
        if (this.isUnique(newArray)) {
            // console.log("验证唯一性")
            return this.removeRandom(grid, target - 1);
        }
        else {
            // 不符合 重新roll一个
            // console.log("不符合 重新roll一个")
            grid[row][col] = tem;
            return this.removeRandom(grid, target);
        }

    }

    // 获取生成的数组题目
    public static getSudoku(grid: number[][], target: number): number[][] {

        return this.removeRandom(grid, target);
    }

    // TODO将最后的结果转化成适合展示的数组，考虑逆转操作
    public static transformArr(grid: number[][]): number[][] {
        let res = new Array(9).fill(null).map(() => new Array(9).fill(0));

        let flag = 0;
        // let maxRow = 3 * (i + 1);
        // let minRow = 3 * i;

        // let j = 0;

        let row = 0;
        let col = 0;

        while (flag < 3) {
            let count = 0;
            let pos = 0;

            while (count < 3) {
                let maxRow = 3 * (flag + 1);
                let minRow = 3 * flag;



                for (let m = minRow; m < maxRow; m++) {
                    for (let n = minRow; n < maxRow; n++) {
                        res[row][col] = grid[m][n + pos * 3 - flag * 3];
                        // console.log(m + 1, n + pos * 3 + 1 - flag * 3, row + 1, col + 1);
                        if (col == 8) {
                            col = 0;
                            row++;
                        }
                        else {
                            col++;
                        }
                    }
                }
                count++;
                pos++;
                // console.log("二层循环", flag, count, pos)
            }
            flag++;

            // console.log("一层循环", flag, count, pos)
        }


        return res;
    }





}