export const alert = {
   noConfirmBtn: function(self, icon, text, timer = 900) {
      return self.$swal({icon, text, showConfirmButton: false, timer,})
   }
}
