const renderError = ( errorData: any ) => {
        if (errorData) {

          if (errorData?.message && errorData.message.length > 0) {
            return errorData.message
          }

          if (errorData.type === 'required') {
            return `Il campo è richiesto.`
          }

          if (errorData.type === 'min') {

            if( errorData.ref.min ){
               return "Il valore minimo è " + errorData.ref.min;
            }
            return 'Il valore minimo è 0.1'
          }
        }
        return ''
      }

export default renderError;