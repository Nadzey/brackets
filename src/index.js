module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const openBrackets = {};
  const closeBrackets = {};
  const sameBrackets = new Set();

  // Создаем объекты для открытых и закрытых скобок для быстрого доступа
  bracketsConfig.forEach((pair) => {
    openBrackets[pair[0]] = pair[1];
    closeBrackets[pair[1]] = true;
    if (pair[0] === pair[1]) {
      sameBrackets.add(pair[0]);
    }
  });

  for (let i = 0; i < str.length; i++) {
    const currentBracket = str[i];

    if (sameBrackets.has(currentBracket)) {
      if (stack.length > 0 && stack[stack.length - 1] === currentBracket) {
        stack.pop();
      } else {
        stack.push(currentBracket);
      }
    } else if (openBrackets[currentBracket]) {
      stack.push(openBrackets[currentBracket]);
    } else if (closeBrackets[currentBracket]) {
      const lastOpenBracket = stack.pop();
      if (currentBracket !== lastOpenBracket) {
        return false;
      }
    } else {
      return false; // Если скобка не является ни открывающей, ни закрывающей
    }
  }

  // Если после обработки строки стек пуст, то все скобки правильно закрыты
  return stack.length === 0;
  }
  
