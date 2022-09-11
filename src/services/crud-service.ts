import { cfg } from './../config/config';

class CrudController {
  public newHeaders:any;
  public userId:any;
  public loading = document.createElement('ion-loading');
  //public navCtrl: HTMLIonRouterElement = document.querySelector('ion-router');
  public navCtrl = document.querySelector('ion-router') as HTMLIonRouterElement;
  headerChange(){
    const token: string | void = JSON.parse(localStorage.getItem('userToken') || '{}') ;
    console.log(token);
    if(token==null||undefined){
      localStorage.removeItem('token');
      this.newHeaders = {
        'Content-Type': 'application/json',
      }
    }else{
      this.newHeaders = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token
      }
    }
    console.log(this.newHeaders)
  }

  async postData(link:any, data:any) {
    await this.headerChange();
    return fetch(cfg.apiUrl + link, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers(
        this.newHeaders
      ),
      
    }).then(response => {
      console.log('suc', response);
      localStorage.setItem(
        'pos'+link,
        JSON.stringify(response.status)
      );
      return response.json();

    })
    .catch(response2 => {
      console.log('fal', response2);
    });
  }


  // async forgotPwd(data){
  //   await this.headerChange();
  //   return await fetch(`${this.baseUrl}/api/v1/authn/recovery/password`, {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type':' application/json'
  //     }
  //     })
  //       .then((response: Response) => {
            
            
  //           return response;
  //       })
  //       .catch((response2: Response) => {
  //           console.log('kedua', response2)
  //     });

  // }
  // async changePwd(data, userId){
  //   return await fetch(`${this.baseUrl}/api/v1/users/${userId}/credentials/change_password`, {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type':' application/json',
  //       'Authorization': 'SSWS 00sToEfOC2YYrI6Plq2hTCjGAclFzmX9K6BkAmkPve'
  //     }
  //     })
  //       .then((response: Response) => {
            
            
  //           return response;
  //       })
  //       .catch((response2: Response) => {
  //           console.log('kedua', response2)
  //     });

  // }

  async resetPass(link:any, data:any) {
    return fetch(cfg.apiUrl + link, {
      method: 'POST',
      body: data,
      headers: new Headers(
        this.newHeaders
      )
    }).then(response => {
      console.log('suc', response);
      localStorage.setItem(
        'pos'+link,
        JSON.stringify(response.status)
      );
      return response.json();

    })
    .catch(response2 => {
      console.log('fal', response2);
    });
  }

  async chgPass(link:any, data:any) {
    await this.headerChange();
    return fetch(cfg.apiUrl + link, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers(
        this.newHeaders
      )
    }).then(response => {
      console.log('suc', response);
      localStorage.setItem(
        'pos'+link,
        JSON.stringify(response.status)
      );
      return response.json();

    })
    .catch(response2 => {
      console.log('fal', response2);
    });
  }

  async getData(link:any,sort:any,page:number){
    this.headerChange();
    return fetch(cfg.apiUrl + link+'?sort='+sort+'&page='+page,{
        method: 'GET',
        headers: new Headers(
          this.newHeaders
        )
    })
    .then((res) => {
      return res.json();
    });
  }

  async getDataNew4(link:any,sort:any,size:any,page:number){
    this.headerChange();
    return fetch(cfg.apiUrl + link+'?sort='+sort+'&size='+size+'&page='+page,{
        method: 'GET',
        headers: new Headers(
          this.newHeaders
        )
    })
    .then((res) => {
      return res.json();
    });
  }

  async getDataTop4(link:any,sort:any,size:any,page:number){
    this.headerChange();
    return fetch(cfg.apiUrl + link+'?sort='+sort+'&size='+size+'&page='+page,{
        method: 'GET',
        headers: new Headers(
          this.newHeaders
        )
    })
    .then((res) => {
      return res.json();
    });
  }


  async getInfo(link:any){
    this.headerChange();
    return fetch(cfg.apiUrl + link,{
        method: 'GET',
        headers: new Headers(
          this.newHeaders
        )
    })
    .then((res) => {
      return res.json();
    });
  }

  async searchData(link:any,type:any, search:any) {
    this.headerChange();
    return fetch(cfg.apiUrl + link+'?'+type+'='+search, {
      method: 'GET',
      headers: new Headers(
        this.newHeaders
      )
    }).then(response => {
      console.log('suc', response);
      localStorage.setItem(
        'get'+link,
        JSON.stringify(response.status)
      );
      return response.json();

    })
    .catch(response2 => {
      localStorage.setItem('getFailedget', response2);
      console.log('fal', response2);
    });

  }

  async getInfoDetail(link:any,id:any){
    this.headerChange();
    return fetch(cfg.apiUrl + link+'/'+id,{
        method: 'GET',
        headers: new Headers(
          this.newHeaders
        )
    })
    .then((res) => {
      return res.json();
    });
  }

  async getDataAll(link:any, page:any) {
      this.headerChange();
      return await fetch(cfg.apiUrl + link+'?page='+page, {
          method: 'GET',
          headers: new Headers(
            this.newHeaders
          )
      })
      .then((res) => {
        return res.json();
      });

  }

  async getDataId(link:any, id:string, page:any) {
    this.headerChange();
    return await fetch(cfg.apiUrl + link+'/'+id + '?page='+page, {
        method: 'GET',
        headers: new Headers(
          this.newHeaders
        )
    })
    .then((res) => {
      return res.json();
    });

}

  async putDataId(link: string, data: any, id: string) {
    await this.headerChange();
    return fetch(cfg.apiUrl + link +'/'+id, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: new Headers(
        this.newHeaders
      )
    }).then(response => {
      console.log('suc', response);
      localStorage.setItem(
        'put'+link,
        JSON.stringify(response.status)
      );
      return response.json();

    })
    .catch(response2 => {
      console.log('fal', response2);
    });
  }


  async putData(link: string, data: any) {
    await this.headerChange();
    return fetch(cfg.apiUrl + link, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: new Headers(
        this.newHeaders
      )
    }).then(response => {
      console.log('suc', response);
      localStorage.setItem(
        'put'+link,
        JSON.stringify(response.status)
      );
      return response.json();

    })
    .catch(response2 => {
      console.log('fal', response2);
    });
  }

}

export const CrudService = new CrudController();