const loadJquery=(callback)=>{

const script = document.createElement("script")
script.src="https://code.jquery.com/jquery-3.7.1.js"
script.integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
script.crossOrigin="anonymous"

script.onload=()=>{
  if(callback){
    callback()
  }
}
  document.head.appendChild(script)
}

loadJquery(()=>{
  $(()=>{

    const BookingService ={
      storageKey: this.ticket,

      getAll(){
          return JSON.parse(localStorage.getItem(this.storageKey)) || []
      },

      add(ticket){
        const tickets= this.getAll()
        if(!this.isBooked){
          tickets.push(ticket)
          localStorage.setItem(this.storageKey,JSON.stringify(ticket))
          return true
        }
        return false;
      },

      remove(ticket){
        const occupiedSeats=this.getAll()
        const filteredTickets= occupiedSeats.filter(t=> !(t.movie===t.ticket && occupiedSeats.seats.some(seat=> ticket.seats.includes(seat))))
        localStorage.setItem(this.storageKey, JSON.stringify(filteredTickets))
      },

      isBooked(ticket){
        const tickets=this.getAll();
          return ticket.some(t=> t.movie===ticket.movie && tickets.seats.some(t=> ticket.includes(t)))
      }
    }

    let selectedSeats = []; // Store temporarily selected seats

    $(".row .seat:not(.occupied)").click(function(){
        const row = $(this).closest(".row").index()-1;
        const column = $(this).index();
        const seatId = `${row}-${column}`;
        
        // Toggle selection
        $(this).toggleClass('selected');
        
        if($(this).hasClass('selected')) {
            selectedSeats.push(seatId);
        } else {
            selectedSeats = selectedSeats.filter(seat => seat !== seatId);
        }

        const moviePrice = $("#movie").val();
        const movieName = $("#movie option:selected").text()
        
        $("#count").text(selectedSeats.length);
        $("#total").text(selectedSeats.length * moviePrice);
    });

    $("#save-booking").click(function() {
      console.log(selectedSeats)
        if(selectedSeats.length > 0) {
            const ticket = {
                movie: $("#movie option:selected").text(),
                price: $("#movie").val(),
                seats: selectedSeats
            };
            debugger
            if(BookingService.add(ticket)) {
               
                console.log(" im here")
                selectedSeats.forEach(seatId => {
                    const [row, column] = seatId.split('-');
                    $(`.row:eq(${parseInt(row)+1}) .seat:eq(${column}`)
                        .removeClass('selected')
                        .addClass('occupied');
                });
                selectedSeats = []; // Clear selected seats
                $("#count").text('0');
                $("#total").text('0');
            }
        }
    });
  })
})