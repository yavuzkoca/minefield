export const useArray = () => {
  const findNeighborhoods = (arr: any[][], i: number, j: number) => {
    const neighborhoods = [];
    const rowLimit = arr.length - 1;
    const columnLimit = arr[0].length - 1;

    for (let x = Math.max(0, i - 1); x <= Math.min(i + 1, rowLimit); x++) {
      for (let y = Math.max(0, j - 1); y <= Math.min(j + 1, columnLimit); y++) {
        if (x !== i || y !== j) {
          neighborhoods.push([x, y]);
        }
      }
    }

    return neighborhoods;
  };

  return {findNeighborhoods};
};
