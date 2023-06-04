$.ajax({
  url: "cars.json",
  dataType: "json",
  success: function (data) {
    var carTable = $("#carTable tbody");
    var allCars = data.cars;
    $.each(allCars, function (index, car) {
      var row = $("<tr>");
      row.append(
        $("<td>").html(
          '<img src="./assets/' + car.model + '.jpg" class="car-img">'
        )
      );
      row.append($("<td>").text(car.brand));
      row.append($("<td>").text(car.model));
      row.append($("<td>").text(car.model_year));
      row.append($("<td>").text(car.mileage));
      row.append($("<td>").text(car.fuel_type));
      row.append($("<td>").text(car.seats));
      row.append($("<td>").text(car.price_per_day));
      row.append(
        $("<td>").text(car.availability ? "Available" : "Not Available")
      );
      row.append($("<td>").text(car.description));

      var addToCartButton = $("<button class='addToCartButton'>Add to Cart</button>");
      if (!car.availability) {
        addToCartButton.prop("disabled", true);
        addToCartButton.css("background-color", "#ccc");
        addToCartButton.css("cursor", "not-allowed");
      }

      row.append($("<td>").append(addToCartButton));
      carTable.append(row);
    });
  }
});

$(document).ready(function() {
  $('#search').on('keyup', function() {
    var value = $(this).val().toLowerCase();
    $('#carTable tbody tr').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

