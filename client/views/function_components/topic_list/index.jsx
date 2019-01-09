import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {inject,observer} from 'mobx-react'


import withStyles from '@material-ui/core/styles/withStyles'

import Container from '../../layout_components/container'
import TopicListItem from './list_item'


import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'

@inject(stores => {
    // stores是一个方法，mobx上的属性都可以直接在stores上面拿到
    return{
        state:stores.state,
        topicStore:stores.topicStore
    }
}) @observer
class TopicList extends Component{
    constructor(props) {
        super(props);
        this.state={
            tabIndex:0
        }
        this.changeTab = this.changeTab.bind(this)
        this.listItemClick = this.listItemClick.bind(this)
    }

    componentDidMount() {
        console.log(1)
        this.props.topicStore.fetchTopics('/api/topics')
    }

    changeTab(e,index){
        this.setState({
            tabIndex:index,
        })
    }

    listItemClick(){

    }

    render(){
        const {classes,topicStore} = this.props

        const topicList = topicStore.topics
        const syncingTopics = topicStore.syncing
        // 首先获取到数据状态，然后使用materialUI中的一个loading原型组件CircularProgress
        return(
            <Container>
                <Tabs value={this.state.tabIndex} onChange={this.changeTab}>
                    {/*value属性用来确定哪个Tab是被选中的,该属性的值就是下面tab的序号,每次点击tab会触发一个事件，
                    用来修改value中的值,这个方法接收两个参数，e和index，虽然不知道是如何传值的，但是照着例子写就没问题*/}
                    <Tab label='全部'/>
                    <Tab label='分享'/>
                    <Tab label='工作'/>
                    <Tab label='问答'/>
                    <Tab label='精品'/>
                    <Tab label='测试'/>
                </Tabs>
                <List>
                    {/*listItem是需要包含在List里面的*/}
                    {topicList.map(topic=>(<TopicListItem onClick={this.listItemClick} topic={topic} key={topic.id}/>))}
                </List>
                {/*<TopicListItem onClick={this.listItemClick} topic={topic}/>*/}
                {/*在这我们还没数据列表，所以先在state中定义一个，
                因为在定义组件的时候接收了onclick事件和topic数据，所以我们要在调用的时候传递进去*/}
                {
                    syncingTopics ? (
                        <div>
                            <CircularProgress color='inherit' size={100}/>
                        </div>
                        // 因为loading需要居中，所以用div包裹
                    ) : null
                        // 使用三元运算符来判断loading是否显示
                }
            </Container>
        )
    }
}

const styles = {
    root:{

    }
}

export default withStyles(styles)(TopicList)
