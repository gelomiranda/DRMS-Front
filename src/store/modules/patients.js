//import api from '../../api/index'
import mutationType from './mutation_type'
//const api = require('../../api/test')
import  api  from '../../api'

// initial state
const state = {
    all: [],
    message: null,
    fields :['id',
    {key:'full_name',label:'Patient Name'},
    {key:'philhealth',label:'Philhealth No'},
    {key:'monday',label:'Monday'},
    'Action']
}

// initial getters
const getters = {
    allBlogs: state => {
      return state.all;
    },
    messages: state => state.message,
    getPatientById: (state) => (id) => {
      return state.all.find(a => a.id == id);
    },
    isLoaded:state => !!state.all.length
}

// initial actions
const actions = {
    // get data from API
    getAllBlogs ({commit}) {
      // api.getAll(blogs => {
      //   commit(mutationType.SHOW_ALL_BLOG, blogs)
      // })

      // test.test(function(response){
      //   console.log(response);
      // })


      // api.test("patients",function(blogs){
      //   console.log(blogs);
      //   commit(mutationType.SHOW_ALL_BLOG, blogs)
      // })
    }

    //   api.get
    // }
    // // save data
    // saveBlog (context, data, bool) {
    //   blogsApi.saveBlog(data, (response) => {
    //     if (response.status === 201) {
    //       state.message = 'Data success has saved'
    //     }
    //     context.dispatch('getAllBlogs')
    //   })
    // },
    // // update blog
    // updateBlog (context, blog) {
    //   blogsApi.updateBlog(blog.id, blog, (response) => {
    //     if (response.status === 201) {
    //       state.message = 'Data success has updated'
    //     }
    //     context.dispatch('getAllBlogs')
    //   })
    // },
    // // delete blog
    // destroy (context, idblog) {
    //   let conf = window.confirm('Are you sure delete this Data?')
    //   if (conf) {
    //     blogsApi.deleteBlog(idblog, (response) => {
    //       if (response.status === 200) {
    //         state.message = 'Data success has deleted'
    //       }
    //       context.dispatch('getAllBlogs')
    //     })
    //   }
    // }
  }

  // initial mutation
const mutations = {
    [mutationType.SHOW_ALL_BLOG] (state, blogs) {
      state.all = blogs
    }
}

  export default {
      state,
      actions,
      getters,
      mutations,
      
  }