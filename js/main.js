let current = document.querySelector('.current'); // Находим текущий элемент
let currentID = parseInt(current.id); // Получаем текущий id как число
const over = document.getElementById('over'); // Модальное окно "Game Over"
const won = document.getElementById('won'); // Модальное окно "Game Won"
const restart = document.getElementById('restart'); // Кнопка перезапуска

let isModalOpen = false; // Флаг для отслеживания состояния модального окна

// Обработчик события keydown
window.addEventListener('keydown', (event) => {
   if (isModalOpen) return; // Если модальное окно открыто, игнорируем нажатия

   let newID; // Переменная для нового id

   switch (event.key) {
      case 'ArrowUp':
         newID = currentID - 10; // Перемещение вверх
         break;
      case 'ArrowDown':
         newID = currentID + 10; // Перемещение вниз
         break;
      case 'ArrowLeft':
         newID = currentID - 1; // Перемещение влево
         break;
      case 'ArrowRight':
         newID = currentID + 1; // Перемещение вправо
         break;
      default:
         return; // Выход, если нажата не стрелка
   }

   // Проверяем, не выходит ли newID за границы поля (от 11 до 55)
   if (
      newID < 11 || // Выход за верхнюю границу
      newID > 55 || // Выход за нижнюю границу
      newID % 10 === 6 || // Выход за правую границу строки (например, 16, 26, 36)
      newID % 10 === 0 // Выход за левую границу строки (например, 20, 30, 40)
   ) {
      console.log('Утка остаётся на месте: выход за границы поля');
      over.showModal(); // Открываем модальное окно "Game Over"
      isModalOpen = true; // Устанавливаем флаг, что модальное окно открыто
      return; // Останавливаем выполнение
   }

   // Находим новый элемент по id
   const newElement = document.getElementById(newID.toString());

   // Если новый элемент не существует, останавливаем выполнение
   if (!newElement) {
      console.log('Утка остаётся на месте: ячейка не найдена');
      return;
   }

   // Удаляем класс current у текущего элемента
   current.classList.remove('current');

   // Добавляем класс current новому элементу
   newElement.classList.add('current');

   // Обновляем переменные current и currentID
   current = newElement;
   currentID = newID;

   // Проверяем, есть ли у нового элемента класс blackcell
   if (newElement.classList.contains('blackcell')) {
      over.showModal(); // Открываем модальное окно "Game Over"
      isModalOpen = true; // Устанавливаем флаг, что модальное окно открыто
   }

   // Проверяем, есть ли у нового элемента класс finish
   if (newElement.classList.contains('finish')) {
      won.showModal(); // Открываем модальное окно "Game Won"
      isModalOpen = true; // Устанавливаем флаг, что модальное окно открыто
   }
});

// Закрытие модального окна "Game Over"
over.addEventListener('close', () => {
   isModalOpen = false; // Сбрасываем флаг при закрытии окна
});

// Закрытие модального окна "Game Won"
won.addEventListener('close', () => {
   isModalOpen = false; // Сбрасываем флаг при закрытии окна
});

// Перезагрузка страницы
restart.onclick = () => {
   location.reload();
};