[id] = fill unique id
[size] = fill size : "'lg'" ,"'sm'" default="" means medium
[title] = fill title : string
[success] = fill title of success buttun : string
[close] = fill title of close or cancel button : string
to open set id to tag modal e.g. <modal #modal1 [id]="'tmpid'" [title]="'some title'">body</modal>
to open call modal1.modalOpen()
!!deprecated   [callbackSuccess]= fill in function name that need to be called back after บันทึก were hit ex [callbackSuccess]="somfuction"
!!deprecated [callbackCancel]= fill in function name that need to be called back after ยกเลิก were hit ex [callbackCancel]="somfuction"
[isShowFooter] boolean

this is output your handleSuccess will be call when success is hit
(modalSuccess)="handleSuccess()"
(modalCancel)="handleCancel()"