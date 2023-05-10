<template>
    <view class="content-wrapper">
        <view class="first-wrapper">
            <!-- 难度 分数 -->
            <view class="sudoku-top">
                <view>新游戏</view>
                <view class="sudoku-info">
                    <view>等级</view>
                    <view>计时</view>
                </view>
            </view>
            <!-- 数独框 -->
            <view class="sudoku-wrapper">
                <view v-for="i in x" :key="i" class="big-box-wrapper">
                    <view v-for="j in y" :key="j" class="small-box-wrapper">

                        <!-- {{ i }}  {{ j }} -->
                        {{ sudoku[i - 1][j - 1] == 0?'':sudoku[i - 1][j - 1] }}
                    </view>
                </view>
            </view>
            <!-- 操作 -->
            <view class="opt-wrapper">
                <view><text class="iconfont icon-wrapper">&#xe60a;</text><text>撤回</text></view>
                <view><text class="iconfont icon-wrapper">&#xe829;</text><text>擦除</text></view>
                <view><text class="iconfont icon-wrapper">&#xe609;</text><text>重置</text></view>
                
               
                
            </view>

            <!-- 数字框 -->
            <view class="number-wrapper">
                <view v-for="i in 9" :key="i" class="number-block">{{
                    i
                }}</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import "@/static/iconfont/sudoku.css";
import { ref } from "vue";
import { Sudoku } from "@/common/Sudoku";
import { SudokuGenerator } from "@/common/gpt";
import { SudokuChecker } from "@/common/SudokuChecker";

const level = ref("");
const totalcount = ref(0);
const errorCount = ref(0);
const x = ref(9);
const y = ref(9);

// const generator = new SudokuGenerator();
// generator.generate();
// generator.printBoard();

const Board = new Sudoku();
Board.generate();
const SudokuList = Board.printBoard();
console.log(SudokuList);

// 矩阵至少应保留17个数字，以确保有唯一解
const question=SudokuChecker.getSudoku(SudokuList,59);

console.log(question,"删除后的结果")
let sudoku=SudokuChecker.transformArr(question);

console.log(sudoku)


// Logical.randomList();

/*
1.选中当前格子，行列九宫格均显示深色，当前格子独立颜色
2.存储用户的操作步骤（包括擦除），以便撤回
3.提交答案后进行验证，错误地方需高亮？（待定）
*/

</script>

<style lang="less">

@topicColor:rgba(110, 134, 180, 1);

.content-wrapper {
    width: 100dvw;
    height: 100dvh;
    // margin-top: 60rpx;
    box-sizing: border-box;
    // border: 5rpx solid rgba(240, 131, 57, 1);
    // background-color: rgba(255, 253, 226, 1);

    .first-wrapper {
        // margin-top: 60rpx;
        // 198,125,30,1
    }
}

.sudoku-top{
    // position: absolute;
    margin-bottom: -300rpx;
    width: 85dvw;
    height: 300rpx;
    background-color: @topicColor;
    z-index: -1;
    padding: 60rpx 60rpx 40rpx 60rpx;
    font-size: 30rpx;
    color: #fff;
    

    >:first-child{
        font-weight: bold;
        margin: -5rpx;
    }

    .sudoku-info{
        margin-top: 20rpx;
        display: flex;
        font-size: 25rpx;
        justify-content: space-between;
    }
}

.sudoku-wrapper {
    // position: absolute;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    text-align: center;
    color: rgba(35, 34, 87, 1);
    font-size: 28rpx;
    font-weight: bold;
    // border: 4rpx solid rgba(110, 134, 180, 1);
    box-sizing: border-box;
    margin: 60rpx 30rpx;
    background-color: #fff;

    .big-box-wrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        border: 4rpx solid @topicColor;
        margin: 0 -4rpx -4rpx 0;
        box-sizing: border-box;

        .small-box-wrapper {
            border: 2rpx solid rgba(197, 197, 215, 0.8);
            // border: 2rpx solid @topicColor;
            // margin: 0 -2rpx -2rpx 0;
            margin: -1rpx -1rpx -1rpx -1rpx;
            // border-top: none;
            // border-left: none;
            padding: 15rpx;
            box-sizing: border-box;
        }
    }
}

.opt-wrapper {
    // background-color: pink;
    margin: 60rpx 120rpx;
    display: flex;
    justify-content: space-between;
    align-content: center;

    .icon-wrapper {
        // width: 60rpx;
        font-size: 60rpx;
        color: @topicColor;
        margin: 0 15rpx;
    }

    view{
        // display: flex;

        text{
            display: block;
            text-align: center;
            margin-top: 5rpx;
            font-size: 25rpx;
            color: @topicColor;
        }
    }
}

.number-wrapper {
    display: flex;
    justify-content: center;

    .number-block {
        background-color: @topicColor;
        color: #fff;
        font-size: 40rpx;
        padding: 15rpx 20rpx;
        margin: 8rpx;
        border-radius: 18rpx;
    }
}
</style>
