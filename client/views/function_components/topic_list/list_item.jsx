import React,{Component} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import IconHome from '@material-ui/icons/Home'

import {PrimaryStyles,SecondaryStyles} from './style'

const Primary=({topic,classes})=>(
    // 因为这个组件其实也需要从topic中获取到数据，所以我们需要在这将topic参数传递进来
        <span className={classes.root}>
            <span className={classes.tab}>{topic.tab}</span>
            <span className={classes.title}>{topic.title}</span>
        </span>
    // 其实也就是返回一个固定结构的dom组件，把他作为一个整体来使用,
    // 把这个组件直接传递给primary属性，注意我们还需要给Primary
    // 定义一个topic属性用来接收父组件中的topic数据{<Primary topic={topic}/>}

)

const Secondary =({topic,classes})=>(
    <span className={classes.root}>
        {/*在这最外层不能用div，否则会报warning，可能是jsx解析之后标签嵌套有问题，都用span没问题*/}
        <span className={classes.userName}>{topic.author.loginname}</span>
        <span className={classes.count}>
            <span className={classes.accentColor}>{topic.reply_count}</span>
            <span>/</span>
            <span>{topic.visit_count}</span>
        </span>
        <span>
        创建时间：{topic.create_at}
        </span>
    </span>
)


const StyledPrimary = withStyles(PrimaryStyles)(Primary)
const StyledSecondary = withStyles(SecondaryStyles)(Secondary)
// withStyles作为装饰器的时候必须要用在class上，不能直接用在function上，
// 所以我们需要进行处理,其实也就是每个组件都需要渲染完steyles之后才能引用，不能先传到父组件中再统一渲染

const TopicListItem = ({onClick,topic}) =>(
    // 因为个组件是一个纯渲染的组件，所以我们直接使用傻瓜式组件
    <ListItem button={true} onClick={onClick}>
        {/*button属性的值是一个布尔值，当为true的时候这个组件是可以点击的，
        点击之后我们还需要触发一个事件，因为我们点击该选项之后需要跳转到详情页，
        触发的事件我们通过外部调用的时候传递进来*/}
        <ListItemAvatar>
            {/*列表组件里面我们根据ui放在第一个位置的就是头像*/}
            <Avatar src={topic.author.avatar_url}/>
            {/*我们通过avatar来存放头像，src属性是头像的位置，因为这只是一个单纯的组件，
            所有的数据都是在调用的时候传递进来的,好像在ListItemAvatar标签中只能使用avatar标签，否则会dom报warning*/}
        </ListItemAvatar>
        <ListItemText
            primary={<StyledPrimary topic={topic}/>}
            secondary={<StyledSecondary topic={topic}/>}
        />
        {/*ListItemText接收的参数中其中两个参数primary和secondary
        除了可以接收一个值外还可以接收一个组件，我们在这自定义两个组件，用来满足我们的ui要求*/}
    </ListItem>
)



export default TopicListItem
