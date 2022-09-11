import { Component, Prop, State, h, EventEmitter, Event } from '@stencil/core';
import { UtilService } from '../../services/util-service';
import { CrudService } from '../../services/crud-service';
import { cfg } from '../../config/config';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'donasi-receipt',
  styleUrl: 'receipt.css',
})
export class Receipt {
  @Prop() Mydata:any;
  @Prop() history?: RouterHistory;
  @Event()uploadCompleted?: EventEmitter<Blob>;
  @State() modal:any = document.querySelector('ion-modal');
  @State() imageSrc:any = null;
  @State() receipt:any = null;
  @State() imgType:any = null;
  @State() dt:any ={};
  @State() postData = {
    "receipt": null,
    "receiptContentType": null
  }

  constructor() {

  }

  public onInputChange(files: FileList) {

    const MAX_UPLOAD_SIZE = 1024000; // bytes
    if(files[0].size > MAX_UPLOAD_SIZE){
        const alert = document.createElement('ion-alert');
        alert.header = 'Oops!';
        alert.subHeader = 'Gambar tidak boleh lebih dari 1 MB';
        alert.buttons = ['OK'];

        document.body.appendChild(alert);
        return alert.present();
    }else{
        if (files.length === 1) {
            const reader = new FileReader();
            const imageFile = files[0];

            // const imgUrl = reader.readAsDataURL();
              
            // check if the user isn't trying to upload a file larger then the MAX_UPLOAD_SIZE
            if (!this.checkFileSize(imageFile.size)) {
            console.error('Maximum file size exceeded. Max file size is: ' + MAX_UPLOAD_SIZE);
            return false;
            }
            // check if the user isn't trying to upload anything else then an image
            else if (!this.checkFileType(imageFile.type)) {
            console.error('File type is not allowed');
            return false;
            }
    
            // upload image
            reader.onload = () => {
            
              //this.receipt = reader.result;
            let str:any = reader.result;;
            let n = str.search("jpeg");
            let t = str.search("TIFF");

            if(n >= 0 || t >= 0){
              this.receipt = str.substring(23);
             
            }else{
              this.receipt = str.substring(22);
              
            }
              this.imgType = imageFile.type;
              //this.postData.receipt = reader.result;
              this.imageSrc = reader.result;
              this.uploadCompleted?.emit(imageFile);
             
            };

            reader.readAsDataURL(imageFile);
            
        } else {
            console.error(files.length === 0 ? 'NO IMAGE UPLOADED' : 'YOU CAN ONLY UPLOAD ONE IMAGE AT THE TIME');
            return false;
        }
    }
    
     // check if 1 image is uploaded
   
  }
  private checkFileSize(size: number): boolean {
    const MAX_UPLOAD_SIZE = 1024; // bytes
    return (size / MAX_UPLOAD_SIZE / MAX_UPLOAD_SIZE) <= MAX_UPLOAD_SIZE;
  }

  private checkFileType(type: string): boolean {
      const ALLOWED_FILE_TYPES:any = 'image.*';
      let TypeMatch:any = type.match(ALLOWED_FILE_TYPES);
      return TypeMatch.length > 0;
  }

  async pushDonate(){

    if(this.receipt == null || ''){
      UtilService.presentToastWithOptions('Harap masukkan bukti pembayaran');
    } else if (this.imageSrc == null || '') {
      UtilService.presentToastWithOptions('Mohon maaf, harap upload ulang pembayaran');
    }
    else{
      // let userData=JSON.parse(localStorage.getItem('userData'));
      //this.userId=userData.id;
     this.dt = JSON.parse(this.Mydata);

      let data={
        id: this.dt.id,
        accountNo: this.dt.accountNo,
        bankName: this.dt.bankName,
        receiptContentType: this.imgType,
        receipt: this.receipt,
        additionalInfo: this.dt.additionalInfo,
        donationDate:this.dt.donationDate,
        isAnonym:this.dt.isAnonym,
        nominal:this.dt.nominal,
        programId:this.dt.programId,
        userId:this.dt.userId
      }



      CrudService.putData(cfg.donation.donations,data).then(()=>{

        let strg = localStorage.getItem('put'+cfg.donation.donations);
        if(strg == '201' || strg == '200'){
          UtilService.presentToastWithOptions('Pembayaran Anda berhasil');
          setTimeout(async() => {
            localStorage.removeItem('put'+cfg.donation.donations);
            //this.history?.replace('/');
            await this.modal.dismiss({
              'dpage': '/riwayat',
          });
          },600);
          
        }else{
          UtilService.presentToastWithOptions('Donasi gagal');
          localStorage.removeItem('put'+cfg.donation.donations);
        }
      })
    }

  }

  render() {
    return [
    <ion-content>
    <div class="header-modal">
        <p class="p-intro"><b>UPLOAD BUKTI PEMBAYARAN</b></p>

        {this.imageSrc != null 
                ? <div class="image-member-regis">
                    <img src={this.imageSrc} alt="image" class="imageOptImg" />
                  </div>
                :''
                }
    </div>
    </ion-content>,

    
       <ion-footer class="div-btn">
            <ion-item class="item-global" lines="none">
                <input class="input-global" type="file" name="files[]" id="file" accept="image/*"
                onChange={($event: any) => this.onInputChange($event.target.files)} />
            </ion-item>
            <ion-button class="btn-donasi4" onClick={() => this.pushDonate()}>
                   UPLOAD
            </ion-button>
      </ion-footer>

    ]
  }

}
