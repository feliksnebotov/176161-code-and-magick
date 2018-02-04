'use strict';

//Облако
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_SHADOW_X = 110;
var CLOUD_SHADOW_Y = 20;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_COLOR = '#fff';
var COLOR_BLACK = '#000';

//Текст
var TEXT_FONT = '16px PT Mono';
var TEXT_VICTORY = 'Ура вы победили!';
var TEXT_VICTORY_COORD_X = 120;
var TEXT_VICTORY_COORD_Y = 40;
var TEXT_RESULT = 'Список результатов:';
var TEXT_RESULT_COORD_X = 120;
var TEXT_RESULT_COORD_Y = 60;

//Диаграмма
var HISTOGRAM_WIDTH = 40;
var HISTOGRAM_HEIGHT = 150;
var HISTOGRAM_COLUMN_GAP = 50;
var HISTOGRAM_START_X = 155;
var HISTOGRAM_START_Y = 85; //(270-150)/2=60 высота пространства над и под гистограммой; 280-150+60-25(текст и отступ)
var HISTOGRAM_TEXT_Y = 255; //280-15(высота текста)-10(отступ)
var columnColor;

var renderCloud = function(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
    var maxElement = arr[0];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > maxElement) {
            maxElement = arr[i];
        }
    }
    return maxElement;
};

window.renderStatistics = function(ctx, names, times) {
    //Рисуем облако
    renderCloud(ctx, CLOUD_SHADOW_X, CLOUD_SHADOW_Y, SHADOW_COLOR);
    renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

    ctx.fillStyle = COLOR_BLACK;
    ctx.font = TEXT_FONT;

    ctx.fillText(TEXT_VICTORY, TEXT_VICTORY_COORD_X, TEXT_VICTORY_COORD_Y);
    ctx.fillText(TEXT_RESULT, TEXT_RESULT_COORD_X, TEXT_RESULT_COORD_Y);

    //Получаем максимальное время прохождения
    var maxTime = getMaxElement(times);

    //Рисуем гистограмму
    for (var i = 0; i < names.length; i++) {
      var time = Math.floor(times[i]);
        // Рисуем колонку нужного цвета
        if (names[i] === 'Вы') {
            columnColor = 'rgba(255, 0, 0, 1)';
        } else {
            columnColor = 'rgba(0, 0, 255, ' + Math.random() + ')';
        }

        ctx.fillStyle = columnColor;
        ctx.fillRect(HISTOGRAM_START_X + (HISTOGRAM_COLUMN_GAP + HISTOGRAM_WIDTH) * i, HISTOGRAM_START_Y, HISTOGRAM_WIDTH, (HISTOGRAM_HEIGHT * times[i]) / maxTime);

        ctx.fillStyle = COLOR_BLACK;
        ctx.fillText(time, HISTOGRAM_START_X + (HISTOGRAM_COLUMN_GAP + HISTOGRAM_WIDTH) * i, HISTOGRAM_TEXT_Y);
        ctx.fillText(names[i], HISTOGRAM_START_X + (HISTOGRAM_COLUMN_GAP + HISTOGRAM_WIDTH) * i, HISTOGRAM_TEXT_Y);

    }

};

/*  ctx.fillText(TEXT_VICTORY, TEXT_VICTORY_COORD_X, TEXT_VICTORY_COORD_Y);
  ctx.fillText(TEXT_RESULT, TEXT_RESULT_COORD_X, TEXT_RESULT_COORD_Y);

  ctx.fillText('Вы', HISTOGRAM_START_X, HISTOGRAM_TEXT_Y);
  ctx.fillRect(HISTOGRAM_START_X, HISTOGRAM_START_Y, HISTOGRAM_WIDTH, HISTOGRAM_HEIGHT);

  ctx.fillText('Иван', HISTOGRAM_START_X + (HISTOGRAM_COLUMN_GAP + HISTOGRAM_WIDTH) * 1, HISTOGRAM_TEXT_Y);
  ctx.fillRect(HISTOGRAM_START_X + (HISTOGRAM_COLUMN_GAP + HISTOGRAM_WIDTH) * 1, HISTOGRAM_START_Y, HISTOGRAM_WIDTH, HISTOGRAM_HEIGHT);

  ctx.fillText('Юлия', HISTOGRAM_START_X + (HISTOGRAM_COLUMN_GAP + HISTOGRAM_WIDTH) * 2, HISTOGRAM_TEXT_Y);
  ctx.fillRect(HISTOGRAM_START_X + (HISTOGRAM_COLUMN_GAP + HISTOGRAM_WIDTH) * 2, HISTOGRAM_START_Y, HISTOGRAM_WIDTH, HISTOGRAM_HEIGHT);

  ctx.fillText('Алексей', HISTOGRAM_START_X + (HISTOGRAM_COLUMN_GAP + HISTOGRAM_WIDTH) * 3, HISTOGRAM_TEXT_Y);
  ctx.fillRect(HISTOGRAM_START_X + (HISTOGRAM_COLUMN_GAP + HISTOGRAM_WIDTH) * 3, HISTOGRAM_START_Y, HISTOGRAM_WIDTH, HISTOGRAM_HEIGHT);*/
