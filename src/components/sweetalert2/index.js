export const alert = {
   noConfirmBtn: function(self, icon, text, timer = 900) {
      return self.$swal({icon, text, showConfirmButton: false, timer,})
   },
   
   confirmBtn: function(self, title, btnText){
      return self.$swal({
         title,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: btnText,
     })
   }
}
