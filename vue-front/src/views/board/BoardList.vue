<template>
  <div class="board-list">
    <div class="common-buttons">
        <button type="button" class="w3-button w3-round w3-blue-gray" @click="fnWrite">등록</button>
    </div>
    <table class="w3-table-all">
        <thead>
            <tr>
                <th>번호</th>
                <th>작성자</th>
                <th>제목</th>
                <th>작성일</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, id) in list" :key="id">
                <th>{{ row.id }}</th>
                <th>{{ row.writer }}</th>
                <th><a @click="fnView(`${row.id}`)">{{ row.title }}</a></th>
                <th>{{ row.write_date }}</th>
            </tr>
        </tbody>
    </table>
    <div class="pagination w3-bar w3-padding-16 w3-small" v-if="paging.total_list_cnt > 0">
        <span class="pg">
        <a href="javascript:;" @click="fnPage(1)" class="first w3-button w3-border">&lt;&lt;</a>
        <a href="javascript:;" v-if="paging.start_page > 10" @click="fnPage(`${paging.start_page - 1}`)"
            class="prev w3-button w3-border">&lt;</a>
        <template v-for=" (n, index) in paginavigation()">
            <template v-if="paging.page == n">
                <strong class="w3-button w3-border w3-green" :key="index">{{ n }}</strong>
            </template>
            <template v-else>
                <a class="w3-button w3-border" href="javascript:;" @click="[fnPage(`${n}`), log()]" :key="index">{{ n }}</a>
            </template>
        </template>
        <a href="javascript:;" v-if="paging.total_page_cnt > paging.end_page"
            @click="fnPage(`${paging.end_page + 1}`)" class="next w3-button w3-border">&gt;</a>
        <a href="javascript:;" @click="[fnPage(`${paging.total_page_cnt}`), log()]" class="last w3-button w3-border">&gt;&gt;</a>
        </span>
    </div>
    <div>
        <select v-model="search_key">
            <option value="">선택</option>
            <option value="title">제목</option>
            <option value="writer">작성자</option>
            <option value="contents">내용</option>
        </select>
        &nbsp;
        <input type="text" v-model="search_value" @keypress.enter="fnPage()">
        &nbsp;
        <button @click="[fnPage(), log()]">검색</button>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            requestBody: {}, //리스트 페이지 데이터전송
            list: {}, //리스트 데이터
            no: '', //게시판 숫자처리
            paging: {
                block: 0,
                end_page: 0,
                next_block: 0,
                page: 0,
                page_size: 0,
                prev_block: 0,
                start_index: 0,
                start_page: 0,
                total_block_cnt: 0,
                total_list_cnt: 0,
                total_page_cnt: 0,
            }, //페이징 데이터
            page: this.$route.query.page ? this.$route.query.page : 1,
            size: this.$route.query.size ? this.$route.query.size : 10,
            // keyword: this.$route.query.keyword,
            search_key: this.$route.query.search_key ? this.$route.query.search_key : '',
            search_value: this.$route.query.search_value ? this.$route.query.search_value : '',
            paginavigation: function () { //페이징 처리 for문 커스텀
                let pageNumber = [] //;
                let start_page = this.paging.start_page;
                let end_page = this.paging.end_page;
                for (let i = start_page; i <= end_page; i++) pageNumber.push(i);
                return pageNumber;
            }
        }
    },
    mounted() {
        this.fnGetList()
    },
    methods: {
        fnGetList() {
            this.requestBody = {
                // keyword: this.keyword,
                page: this.page,
                size: this.size,
                search_key: this.search_key,
                search_value: this.search_value
            }

            this.$axios.get(this.$serverUrl + "/board/list", {
                params: this.requestBody,
                headers: {} 
            }).then((response) => {
                // this.list = response.data
                
                if (response.data.result_code === "OK") {
                    this.list = response.data.data
                    this.paging = response.data.pagination
                    this.no = this.paging.total_list_cnt - ((this.paging.page - 1) * this.paging.page_size)
                }
            }).catch((err) => {
                if (err.message.indexOf('Network Error') > -1) {
                    alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
                }
            })
        },
        fnView(id) {
            this.requestBody.id = id
            this.$router.push({
                path: './detail',
                query: this.requestBody
            })
        },
        fnWrite() {
            this.$router.push({
                path: './write'
            })
        },
        fnPage(n) {
            if(this.page !== n) {
                this.page = n
            }
            this.fnGetList()
        },
        log() {
            console.log(this.requestBody);
        }
    }
}
</script>

<style>

</style>