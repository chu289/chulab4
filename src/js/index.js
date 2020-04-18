window.onload = function () {
    var web = new Vue({ 
        el: '#web', //vue.js 在掛載資料時'#'井字號之後的名稱需要與body 下的第一個 div 中的 id 名稱相同
        data() {
            return {
                loading: true,
                undoloading: true,
                doloading: true,
                todoInput: '',  
                todoList: [],   
                undoneList: [],
                completedList: [],
                tempList: [],    //在不同狀態之間的資料交換時使用tempList作為深度拷貝所需要的容器
                a: [{
                    id: 1,
                    title: 'A1'
                },
                {
                    id: 2,
                    title: 'A2'
                }],
                b: [{
                    id: 1,
                    title: 'B1'
                },
                {
                    id: 2,
                    title: 'B2'
                }]
            }
        },
        mounted() {   //在網頁開啟後優先掛載的資料或執行的function
            this.todoList = [{
                id: 1,
                title: 'Welcome html',
                completed: false
            },
            {
                id: 2,
                title: 'Welcome css',
                completed: true
            },
            {
                id: 3,
                title: 'Welcome vue.js',
                completed: false
            }]
            this.loading = false //掛載完成loading結束
            this.undoloading = true
            this.doloading = true
            this.jquery()
        },
        methods: {
            handleAdd() {
                if (this.todoInput.trim().length == 0) {    // 判斷todoInput中是否有字  //.trim避免用戶誤輸入空白字元
                    alert('記得填寫內容噢...')
                    return
                }
                
                const ID = this.todoList.length + 1     // 讀取全域變數todoList的資料筆數，並將現有的資料筆數+1當作新的ID

                const data = {
                    id: ID,
                    title: this.todoInput,
                    completed: false
                }

                this.todoList.push(data)
                this.handleRest()
                this.undoloading = true //在add Funtion後避免使用者立即切換到其他狀態的List時看不到資料誤認為沒有成功所以先預設為正在lodaing
                this.doloading = true
            },
            handleRest() {
                this.todoInput = ''
            },
            handleRemoveItem(item) {
                var found = false
                for (var i = 0; i < this.todoList.length; i++) {
                    if (this.todoList[i].id == item.id) {
                        found = true
                        break
                    }
                }
                if (found) {
                    this.todoList.splice(i, 1) //在array中新增或移除item，並return刪除的item(在位置i刪除1筆資料)
                }
            },
            handleEditUndone() {
                this.loading = true
                this.doloading = true
                for (var i = 0; i < this.todoList.length; i++) {
                    for (var j = 0; j < this.undoneList.length; j++) {
                        if (this.todoList[i].id == this.undoneList[j].id) {
                            this.todoList[i] = this.undoneList[j]
                        }
                    }
                }
                this.loading = false
                this.doloading = false
            },
            handleEditDone() {
                this.loading = true
                this.undoloading = true
                for (var i = 0; i < this.todoList.length; i++) {
                    for (var j = 0; j < this.completedList.length; j++) {
                        if (this.todoList[i].id == this.completedList[j].id) {
                            this.todoList[i] = this.completedList[j]
                        }
                    }
                }
                this.loading = false
                this.undoloading = false
            },
            getTodoList() {
                console.log("未完成狀態，讀取進度",this.undoloading)
                console.log("已完成狀態，讀取進度",this.doloading)
            },
            getUndoneList() {
                if (this.undoloading == true) {
                    alert('讀取中請稍後...')
                }

                this.tempList.splice(0)
                for (var i = 0; i < this.todoList.length; i++) {
                    if (this.todoList[i].completed == false) {
                        this.tempList.push(this.todoList[i])
                    }
                }
                this.undoneList = JSON.parse(JSON.stringify(this.tempList))
                this.undoloading = false
                this.loading = false
                this.doloading = true

                if (this.undoneList.length == 0) {
                    alert('沒有待辦事項囉')
                    this.undoloading = false
                    this.loading = false
                    this.doloading = true
                }
            },
            getcompletedList() {
                if (this.doloading == true) {
                    alert('讀取中請稍後...')
                }
                this.loading = false
                this.undoloading = true
                this.tempList.splice(0)
                for (var i = 0; i < this.todoList.length; i++) {
                    if (this.todoList[i].completed == true) {
                        this.tempList.push(this.todoList[i])
                    }
                }
                this.completedList = JSON.parse(JSON.stringify(this.tempList))
                if (this.completedList.length == 0) {
                    alert('待辦事項都尚未完成噢')
                } else {
                    this.undoloading = true
                    this.loading = false
                    this.doloading = false
                }
            },
            // 深度拷貝範例
            assign() {
                this.a = this.b
            },
            deepCopy() {
                this.a = JSON.parse(JSON.stringify(this.b))
            },
            reset() {
                this.a = [{
                    id: 1,
                    title: 'A1',
                    completed: false
                },
                {
                    id: 2,
                    title: 'A2',
                    completed: true
                }],
                this.b = [{
                    id: 1,
                    title: 'B1',
                    completed: false
                },
                {
                    id: 2,
                    title: 'B2',
                    completed: true
                }]
            },
            changeB() {
                this.b.splice(0,2)
            }
        }
    })
}