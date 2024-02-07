<template>
  <div class="board-detail">
        <div class="board-contents">
          <input type="text" v-model="title" class="w3-input w3-border" placeholder="제목을 입력해주세요.">
          <input type="text" v-model="password" class="w3-input w3-border" placeholder="비밀번호를 입력해주세요.">
          <input type="text" v-model="writer" class="w3-input w3-border" placeholder="작성자를 입력해주세요." v-if="id === undefined">
        </div>
        <div class="board-contents">
            <textarea id="" cols="30" rows="10" v-model="contents" class="w3-input w3-border" style="resize: none;">
            </textarea>
        </div>
        <div class="common-buttons">
          <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">저장</button>&nbsp;
          <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
        </div>
      </div>
</template>

<script>
export default {
    data() { //변수생성
        return {
            requestBody: this.$route.query,
            id: this.$route.query.id,

            title: '',
            writer: '',
            write_date: '',
            contents: '',
            password: ''
        }
    },
    mounted() {
        this.fnGetView()
    },
    methods: {
        fnGetView() {
            if (this.id !== undefined) {
                this.$axios.get(this.$serverUrl + '/board/' + this.id, {
                    params: this.requestBody
                }).then((response) => {
                    this.writer = response.data.writer
                    this.title = response.data.title
                    this.contents = response.data.contents
                    this.write_date = response.data.write_date
                }).catch((err) => {
                    console.log(err)
                })
            }
        },
        fnList() {
            delete this.requestBody.id
            this.$router.push({
                path: './list',
                query: this.requestBody
            })
        },
        fnView(id) {
            this.requestBody.id = id
            this.$router.push({
                path: './detail',
                query: this.requestBody
            })
        },
        fnSave() {
            let apiUrl = this.$serverUrl + '/board'
            this.form = {
                "id": this.id,
                "writer": this.writer,
                "password": this.password,
                "title": this.title,
                "contents": this.contents
            }

            if ( this.id === undefined ) {
                this.$axios.post(apiUrl, this.form)
                    .then((response) => {
                        alert('save')
                        this.fnView(response.data.id)
                    }).catch((err) => {
                        if (err.message.indexOf('Network Error') > -1) {
                            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
                        }
                    })
            } else {
                this.$axios.patch(apiUrl, this.form)
                    .then((response) => {
                        alert('update')
                        this.fnView(response.data.id)
                    }).catch((err) => {
                        if (err.message.indexOf('Network Error') > -1) {
                            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
                        }
                    })
            }
        }
    }
}
</script>

<style>

</style>