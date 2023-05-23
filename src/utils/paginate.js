export default function paginate(size, current, items, handler) {
  const count = Math.ceil(items.length / size);

  current = Math.min(count, Math.max(1, current));

  const start = (current - 1) * size;
  const end = start + size;
  const page = items.slice(start, end);
  const buttonNums = [
    1, 2, 3,
    current - 2,
    current - 1,
    current,
    current + 1,
    current + 2,
    count - 2,
    count - 1,
    count
  ].filter((x, index, arr) => x > 0 && x <= count && arr.indexOf(x) === index);

  // Insert ... at discontinuities
  for (let i = 1; i < buttonNums.length; i ++) {
    if (buttonNums[i - 1] !== "..." && buttonNums[i] - buttonNums[i - 1] !== 1) {
      buttonNums.splice(i, 0, "...");
    }
  }

  const buttons = buttonNums.map((num, index) => (
    <button
      key={index}
      onClick={() => num !== "..." && handler(num)}
      disabled={current === num}
    >
      {num}
    </button>
  ));

  return {
    count,
    page,
    buttons,
  }
}
