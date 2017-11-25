<style scoped lang="sass">
  .modifyRecord{
    font-size: 14px;
    padding:15px 0 0 60px;
    color: #7d7f8c;
    p{
      position: relative;
      margin: 0;
      background: #f8f8f8;
      height:36px;
      line-height: 36px;
      padding:0 20px;
      &:before{
        content:'';
        position: absolute;
        width:12px;
        top:12px;
        left:-20px;
        height:12px;
        border-radius: 50%;
        border:1px solid  #becad8;
        z-index: 100;
      }
      &:after{
        content:'';
        position: absolute;
        width:1px;
        background:#ebebeb;
        height:100%;
        top:25px;
        left:-14px;
        z-index: 99;
      }
    }
    p:last-child{
      &:after{
        content: '';
        width:0px;
      }
    }
  }
</style>
<template>
  <div class="modifyRecord">
    <div>
      <p>
        2017年9月9日  10：23
      </p>
      <p>
        2017年9月9日  10：23
      </p>
      <p>
        2017年9月9日  10：23
      </p>
      <p>
        2017年9月9日  10：23
      </p>
      <p>
        2017年9月9日  10：23
      </p>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{

      }
    },
    mounted(){
      this.init();
    },
    methods:{
      async init(){
        console.log( new Promise((resolve, reject) => {
          resolve('sync')
        }).then((val)=>{
          this.last();
        },(err)=>{
          console.log(err)
        }));
        console.log('asnyc')
      },
      last(){
        console.log('last')
      }
    }
  }
</script>
