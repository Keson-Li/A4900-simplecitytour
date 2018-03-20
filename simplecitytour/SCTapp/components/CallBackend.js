import IP from './IPaddr';
export default class CallBackend {
    static async post(path, data){
        var response   = [true] ;
        url = IP + path;
        await fetch(url, {
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(data),
            method: 'POST',
          }).then((backend_resp) => {
            response.push(backend_resp);
      
          }, (err) => { 
              response[0] = false;
              response.push(err);
            //   resp = err.message;
          });

          console.log(response);

          return response

    }

    static async get(path){
        // var resolve = true;
        // var resp;
        var response   = [true] ;
        url = IP + path;
        await fetch(url, {
            headers: {'Content-Type': 'application/json',},
            method: 'GET',
          }).then((backend_resp) => {
              response.push(backend_resp);
          }, (err) => { 
              response[0] = false;
              response.push(err.message);
          });
          return response

    }
}


// This two function can be user when calling the backend, the format can be:
// import CallBackend from './CallBackend';  ------------ import this class in whatever file you want to call backend
// CallBackend.get(path).then((fetch_resp) =>{
//     if (fetch_resp[0]){


//       response = fetch_resp[1]-----------------------the real response from backend

        // console.log(response);
    

//     }else{

//       err = fetch_resp[1]------------------------------real err message from backend


//     }

//   },(err) =>{

        // this block was call when err ocour when call get/post in this file
        
// });