import {observable,action,computed,extendObservable} from 'mobx'

import {topicSchema} from '../util/variable_define'

import {get} from '../util/http'

const createTopic =(topic)=>{
    return Object.assign({},topicSchema,topic)
    // assign将多个数据整合到目标对象上，重名属性会被后面的数据源覆盖
}


class Topic{
    constructor(data){
        // 我们首先要定义一个初始函数，将topics的真实数据传递进去，
        // 这样我们就可以方便的调用这个类的相关属性，我们需要在mobx中引入extendObservable来帮助我们完成
        extendObservable(this,data)
        // 我们把data赋值到this上面，因为mobx的特性，
        // 在这如果不使用extendObservable会导致data并没有数据绑定
        // 的效果（只有通过@observable声明的数据才有数据绑定的效果），
        // 这个方法的作用就是把一个对象的所有属性都添加到observable上，在这还有一个隐患，
        // 就是data中声明的值不见得是每次传递过来的都包含所有的数据，而data对象只会初始化一次，
        // 当有数据添加的时候就会报错，所以我们在这需要定义一个data数据的模板，将包含的所有数据的字段以及默认值填充好，
        // 从而第一次初始化的时候就是一个完整的模板

        // 在util文件夹下新建一个文件variable_define.js，用来存储所有数据的初始值,export const topicSchema = {}，
        // 然后我们将那个数据模板传递进来,然后我们创建一个方法，将数据模板、真实数据结合生成一个新的对象createTopic

    }
    @observable syncing = false
    // 这的意思是我们在处理data的过程中给syncing一个初始值，便于我们进行加载loading等处理
}

class TopicStore {
    @observable topics
    @observable syncing
    // 首先定义两个变量，一个用来存放数据对象，一个用来判断是否数据正在请求,
    // 我们把这个变量作为一个对象来对待，而不是定义多个变量对待

    constructor({syncing, topics}={syncing:false,topics:[]}){
        // constructor接收两个变量，方便在数据渲染的时候初始化数据
        this.syncing = syncing
        // this.topics = topics
        // 为了让以后扩展更容易，我们定义一个topic的类，
        // 这样每个topic都是一个类的实例，这样我们可以在这个类里面检测控制更多的东西,首先创建Topic这个类
        // 然后把已经加工好的topic传递给topics
        this.topics = topics.map(topic => new Topic(createTopic(topic)))
    }

    // 然后定义获取数据的方法，因为所有的数据加工都需要我们通过mobx来操作，这样才能很好的把握数据流，来保证有据可循
    // 首先定义一个方法，然后把我们定义好的get请求导入进来
    @action fetchTopics(url){
        // 首先我们要定义一个promise方法，因为这是一个异步请求
        return new Promise((resolve,reject)=>{
            this.syncing = true
            // const params1 = Object.assign({},params,{mdrender:false})
                // 这个query参数是告诉api是否把markdawn字符串渲染成html字符串
            // console.log(params1)
            // 因为我们需要判断数据是否还在请求,所以我们在这先丁意思一个变量，然后在数据获取完成之后再修改
            // this.topics = []
            get('/api/topics',{})
                .then(res=>{
                    if(res.success){
                        // 将获取的数据赋值给topics变量
                        res.data.forEach(topic =>{
                            this.topics.push(new Topic(createTopic(topic)))
                        })
                        console.log(this.topics)
                        resolve()
                        // 如果数据没问则直接返回resolve，如果有问题则返回reject
                    }else {
                        reject()
                    }
                    this.syncing = false
                    // 无论数据请求是否成功数据请求完成都需要把syncing状态改成false
                })
                .catch(err=>{
                    reject(err)
                    this.syncing = false
                })
            // 到这数据获取的方法就写好了
        })
    }
}
// 然后将这个class类暴露出去，在store.js中进行整合，并传入到reactdom中去，然后在需要的地方调用
export default TopicStore
