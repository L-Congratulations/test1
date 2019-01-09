import React,{Component} from 'react'
import PropTypes from 'prop-types'

import withStyles from '@material-ui/core/styles/withStyles'

import Paper from '@material-ui/core/Paper'

const Container = ({children,classes})=>(
    // 因为这个组件比较简单，只是一个容器，把内容放进去就可以了
    // ，内容的业务逻辑在内容中进行编辑，没有逻辑和事件，
    // 这个傻瓜式组件接收的参数就是props，我们可以通过解构的方式直接拿到props里面的参数
    <Paper elevation={4} className={classes.root}>
        {/*elevation参数是这个组件漂浮的高度，让页面看起来有层次感*/}
        {children}
        {/*我们直接用这个组件来包含传递过来的内容就可以了，
        其实在这分离出来，主要是我们需要给他定义一些样式(app_bar距离顶部有一个高度，我们需要在内容组件中把高度留出来），
        这样的话在别的地方需要引用的时候就不用多次定义样式了，
        而直接写在home页面的话别的地方需要引用的时候还要重新定义，
        所以封装成一个组件灵活调用*/}
    </Paper>
)

const styles = {
    root:{
        margin:24,
        marginTop:80,
    }
}

export default withStyles(styles)(Container)
// 在需要container的组件外部使用直接将子节点包含进去就行了<Container>子节点内容</Container>
