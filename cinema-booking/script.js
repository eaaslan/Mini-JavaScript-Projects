const loadJquery = (callback) => {
  const script = document.createElement("script");
  script.src = "https://code.jquery.com/jquery-3.7.1.js";
  script.integrity = "sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=";
  script.crossOrigin = "anonymous";

  script.onload = () => {
    if (callback) {
      callback();
    }
  };
  document.head.appendChild(script);
};

loadJquery(() => {
  $(() => {
    const BookingService = {
      storageKey: "tickets",

      getAll() {
        return JSON.parse(localStorage.getItem(this.storageKey)) || [];
      },

      add(ticket) {
        const tickets = this.getAll();
        const isAnySeatBooked = ticket.seats.some((seat) =>
          tickets.some(
            (t) => t.movie === ticket.movie && t.seats.includes(seat)
          )
        );

        if (!isAnySeatBooked) {
          tickets.push(ticket);
          localStorage.setItem(this.storageKey, JSON.stringify(tickets));
          return true;
        }
        return false;
      },

      remove(ticket) {
        const occupiedSeats = this.getAll();
        const filteredTickets = occupiedSeats.filter(
          (t) =>
            !(
              t.movie === ticket.movie &&
              t.seats.some((seat) => ticket.seats.includes(seat))
            )
        );
        localStorage.setItem(this.storageKey, JSON.stringify(filteredTickets));
      },

      isBooked(ticket) {
        const tickets = this.getAll();
        return tickets.some(
          (t) =>
            t.movie === ticket.movie &&
            t.seats.some((seat) => ticket.seats.includes(seat))
        );
      },

      getOccupiedSeatsForMovie(movieName) {
        const tickets = this.getAll();
        return tickets
          .filter((t) => t.movie === movieName)
          .flatMap((t) => t.seats);
      },
    };

    let selectedSeats = [];

    $("#movie").change(function () {
      const selectedMovie = $(this).find("option:selected").text();
      $(".row .seat").removeClass("occupied selected");
      selectedSeats = [];
      const occupiedSeats =
        BookingService.getOccupiedSeatsForMovie(selectedMovie);
      occupiedSeats.forEach((seatId) => {
        const [row, column] = seatId.split("-");
        $(`.row:eq(${parseInt(row)}) .seat:eq(${column})`).addClass("occupied"); // Added closing parenthesis
      });

      $("#count").text("0");
      $("#total").text("0");
    });

    $(".container").on("click", ".row .seat:not(.occupied)", function () {
      const row = $(this).closest(".row").index() - 1;
      const column = $(this).index();
      const seatId = `${row}-${column}`;

      $(this).toggleClass("selected");

      if ($(this).hasClass("selected")) {
        selectedSeats.push(seatId);
      } else {
        selectedSeats = selectedSeats.filter((seat) => seat !== seatId);
      }

      const moviePrice = $("#movie").val();
      $("#count").text(selectedSeats.length);
      $("#total").text(selectedSeats.length * moviePrice);
    });

    $("#save-booking").click(function () {
      if (selectedSeats.length > 0) {
        const ticket = {
          movie: $("#movie option:selected").text(),
          price: $("#movie").val(),
          seats: selectedSeats,
        };
        console.log(selectedSeats);

        if (BookingService.add(ticket)) {
          selectedSeats.forEach((seatId) => {
            const [row, column] = seatId.split("-");
            $(`.row:eq(${parseInt(row)}) .seat:eq(${column})`)
              .removeClass("selected")
              .addClass("occupied");
          });
          selectedSeats = [];
          $("#count").text("0");
          $("#total").text("0");
        }
      }
    });

    $("#movie").trigger("change");
  });
});
