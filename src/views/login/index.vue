<template>
    <div class="login_wrap">
        <div class="login_wrap_content">
            <ul>
                <li class="login_wrap_content_img"></li>

                <li class="login_wrap_content_list"> 
                    <div>
                        <p v-for="(item,index) in ProductsList" :key="index">
                            <SvgIcon :icon-class="item.svgName" width="56px" height="76"/>
                            <p>{{ item.productName }}</p>
                        </p>
                    </div>
                </li>

                <li class="login_wrap_content_login">
                    <LoginForm />
                </li>
            </ul>
        </div>
        
        <footer>
            备案号：<a :href="footerDetails.link" target="_blank" class="text-red">{{ footerDetails.recordNumber }}</a>，Copyright 2024 by 红火蚁科技有限公司。技术支持：13560111110
        </footer>
    </div>
</template>

<script setup lang="ts">
import { ProductsList,footerDetails } from "../login/index";

</script>

<style lang="scss" scoped>

.common_sty {
    font-size: 14px;
    width: 100%;
    height: 37px;
}
.login_wrap{
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
 
    &_content{
        @include flexLayout;
        @include bgSet(url("@/assets/images/login_bg.png"));
        background-size:100% 100%;
        background-repeat:no-repeat;
        height: 92%;
        min-height:560px;
        ul{
            @include flexLayout;
            li{
               height: 528px;
            }
        }
        &_img{
           width: 493px;
           @include bgSet(url("@/assets/images/login_left_bg.png"));
        }
        &_list{
           margin: 0 15px;
           width: 366px;
        }
        &_login{
           width: 330px;
        }
    }
   
    &::before{
        @extend .common_sty;
        display: block;
        content: "";
        background: #fff;
    }
    footer{
        @extend .common_sty;
        @include flexLayout;
        overflow: scroll;
        word-break: break-all;
        &::-webkit-scrollbar {
            display: none;
        }
    }
}

</style>
