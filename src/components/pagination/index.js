import paginationComponents from './src/be-pager.vue';

const pagination = {
    install:function(Vue) {
        Vue.component('be-pager', paginationComponents)
    },
    service:paginationComponents
}

export default pagination;