# 选择排序（Selection Sort）

选择排序(Selection-sort)是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。

## 算法描述

n 个记录的直接选择排序可经过 n-1 趟直接选择排序得到有序结果。具体算法描述如下：

- 初始状态：无序区为 R[1..n]，有序区为空；
- 第 i 趟排序(i=1,2,3…n-1)开始时，当前有序区和无序区分别为 R[1..i-1]和 R(i..n）。该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第 1 个记录 R 交换，使 R[1..i]和 R[i+1..n)分别变为记录个数增加 1 个的新有序区和记录个数减少 1 个的新无序区；
- n-1 趟结束，数组有序化了。

## 动图演示

![选择排序](../../../../assets/ranuts/sort/select.gif)

## 代码实现

```js
const select = (list: number[]): number[] => {
  const size = list.length;
  for (let i = 0; i < size; i++) {
    let minIndex = i;
    for (let j = i + 1; j < size; j++) {
      if (list[minIndex] >= list[j]) {
        minIndex = j;
      }
    }
    if (list[i] !== list[minIndex]) {
      list[i] = list[i] ^ list[minIndex];
      list[minIndex] = list[i] ^ list[minIndex];
      list[i] = list[i] ^ list[minIndex];
    }
  }
  return list;
};
```

## 算法分析

表现最稳定的排序算法之一，因为无论什么数据进去都是 O(n2)的时间复杂度，所以用到它的时候，数据规模越小越好。唯一的好处可能就是不占用额外的内存空间了吧。理论上讲，选择排序可能也是平时排序一般人想到的最多的排序方法了吧。
