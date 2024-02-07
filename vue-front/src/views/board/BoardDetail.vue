<template>
    <div class="board-detail">
        <div class="board-contents">
            <h3>{{ title }}</h3>
            <div>
            <strong class="w3-large">{{ writer }}</strong>
            <br>
            <span>{{ write_date }}</span>
            <br>
            <span>{{ contents }}</span>
            </div>
        </div>
        <div class="common-buttons">
            <button type="button" class="w3-button w3-round w3-blue-gray" @click="fnUpdate">수정</button>&nbsp;
            <button type="button" class="w3-button w3-round w3-red" @click="fnDelete">삭제</button>&nbsp;
            <button type="button" class="w3-button w3-round w3-gray" @click="fnList">목록</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            requestBody: this.$route.query,
            id: this.$route.query.id,

            title: '',
            writer: '',
            write_date: '',
            contents: ''
        }
    },
    mount() {
        this.fnGetView()
    },
    methods: {
        fnGetView() {
            this.$axios.get(this.$serverUrl + '/board/' + this.id, {
                params: this.requestBody
            }).then((response) => {
                this.title = response.data.title
                this.writer = response.data.writer
                this.write_date = response.data.write_date
                this.contents = response.data.contents
            }).catch((err) => {
                if (err.message.indexOf('Network Error') > -1) {
                    alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
                }
            })
        },
        fnUpdate() {
            this.$router.push({
                path: './write',
                query: this.requestBody
            })
        },
        fnDelete() {
            if( !confirm("delete?") ) return // 무슨 구조일까
            this.$axios.delete(this.$serverUrl + '/board/' + this.id, {})
                .then(() => {
                    alert("delete")
                    this.fnList();
                }).catch((err) => {
                    console.log(err);
                })
        },
        fnList() {
            delete this.requestBody.id
            this.$router.push({
                path: './list',
                query: this.requestBody
            })
        }
    }
}
</script>

<style>

</style>