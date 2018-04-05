// import IP from './IPaddr';
import Storage from './StorageControl';
import CallBackend from './CallBackend';

export default class PreDownload {
   static getCityImgs() {
        path = '/api/get_imgs/';
        CallBackend.get(path).then((fetch_resp) =>{
            if (fetch_resp[0]){
                response = fetch_resp[1];
                if (typeof JSON.parse(response._bodyText)!= "undefined") {
                    imgInfo = JSON.parse(response._bodyText);
                    for (var key in imgInfo) {
                        if (imgInfo.hasOwnProperty(key)) {         
                            Storage.saveItem(key, imgInfo[key]);
                            console.log("Image of \""+ key + "\" were saved.");
                        }
                    }
                }
            }else{
                err = fetch_resp[1];
                if (err.message = 'Network request failed'){
                    console.log('Network failed when fetching images.')
                } else{
                    console.log("failed when fetching images.")
                }
            }

        },(err) =>{
            console.log('promise rejected.');            
        });

    }


    static getLocations() {
        path ='/api/get_all_locations/';
    
        // fire a get request to CallBackend
        CallBackend.get(path).then((fetch_resp) =>{
            if (fetch_resp[0]){
                response = fetch_resp[1] 
                if (typeof JSON.parse(response._bodyText) != "undefined") {

                    Storage.saveItem("citySequence", JSON.parse(response._bodyText)['citySequence']);
                    locationObject      =    JSON.parse(response._bodyText);
                    delete locationObject['citySequence'];
                    Storage.saveItem("allLocations", JSON.stringify(locationObject));
                    console.log("All names of all locations were saved.");
                }
            }else{
                err = fetch_resp[1]
                if (err.message = 'Network request failed'){
                    console.log('Network failed when fetching locations.')
        
                } else{
                    console.log("failed when fetching locations.")
                }
        
            }
    
        });
    }

    static getPoints() {
        path ='/api/get_points/';
        console.log('Getting points from server');
        CallBackend.get(path).then((fetch_resp) =>{
            if (fetch_resp[0]){
                response = fetch_resp[1] 
                console.log(response);
                if(typeof JSON.parse(response._bodyText) != "undefined") {

                    Storage.saveItem("pointSequence", JSON.parse(response._bodyText)['pointSequence']);
                    allPoints      =    JSON.parse(response._bodyText);
                    delete allPoints['pointSequence'];

                    Storage.saveItem("allPoints", JSON.stringify(allPoints));
                    console.log("All Points info of all locations were saved.")

                    // Storage.getItem('allLocations').then((locations) => {

                    //     allCities = JSON.parse(locations);

                    //     for(var key in allCities){
                    //         allCities[key].push(allPoints[key]);
                    //         console.log('Point info were save: '+key)
                    //     }
                    //     Storage.saveItem("allLocations", JSON.stringify(allCities));
                    // },(err) =>{alert('err')});
                }
            }else{
                err = fetch_resp[1]
                if (err.message = 'Network request failed'){
                    console.log('Network failed when fetching locations.')
        
                } else{
                    console.log("failed when fetching locations.")
                }
            }
        });    
    }


}



