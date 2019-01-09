import React,{Component} from 'react'
import Proptypes from 'prop-types'

import withStyles from '@material-ui/core/styles/withStyles'

import {NavLink} from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Typography from '@material-ui/core/Typography'
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";

class HomeAppBar extends Component{
    constructor(props){
        super(props)
        this.homeClick = this.homeClick.bind(this)
        this.createButton = this.createButton.bind(this)
        this.loginButton = this.loginButton.bind(this)

    }

    homeClick(){

    }
    createButton(){

    }
    loginButton(){

    }
    render(){
        const {classes} = this.props
        return(
            <div>
                <AppBar position='fixed' color='secondary'>
                    {/*fixed是将该元素固定在页面顶部*/}
                    <Toolbar>
                        <IconButton color='inherit' onClick={this.homeClick}>
                            {/*icon的点击事件需要添加在iconButton上，这样的话在点击的时候会自动带有点击效果*/}
                            <HomeIcon/>
                        </IconButton>
                        <Typography type='title' color='inherit' className={classes.flex}>
                            {/*使用typography可以给文字设置字体样式*/}
                            {/*flex:1是让该元素撑满整个容器*/}
                            OKOI
                        </Typography>
                        <Button variant='contained' color='secondary' onClick={this.createButton}>
                            新建话题
                        </Button>
                        <Button color='inherit' onClick={this.loginButton}>
                            {/*<NavLink to={}>登录</NavLink>*/}
                            登录
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const styles={
        root:{

        },
    flex:{
            flex:1
    }
}

export default withStyles(styles)(HomeAppBar)
