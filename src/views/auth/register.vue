<style scoped lang="sass">
  .el-form{
    width:740px;
    margin:0 auto;
  }

</style>
<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="account">
        <el-input type="text" v-model="ruleForm.account" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {Ajax} from '@/lib/common';
  const md5 = require('md5');
  const cookie = require('js-cookie');
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validateAccout =(rule, value, callback) => {
        let regExp = /^[A-Za-z0-9]{6,10}$/;
        if (value === '') {
          callback(new Error('请填写账号'));
        }else{
          if (regExp.test(this.ruleForm.account)) {
            callback();
          }else{
            callback(new Error('6至10位数字、字母、或者数字字母组合'));
          }
        }
      };
      var validatePass = (rule, value, callback) => {
        let regExp = /^(?![A-Za-z]+$)(?![0-9]+$)[A-Za-z0-9]{6,10}$/
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(regExp.test(value)){
          if (this.ruleForm.checkPass != "") {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }else{
          callback(new Error('6至10位数字和英文组合'));
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          account:'',
          pass: '',
          checkPass: '',
        },
        rules: {
          account:[
            {validator:validateAccout,trigger:'blur',required:true}
          ],
          pass:[
            { validator: validatePass, trigger: 'blur',required: true, }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur',required: true }
          ]
        }
      };
    },
    methods: {
      valid(){
        return new Promise((resolve)=>{
          this.$refs.ruleForm.validate(valid=>resolve(valid));
        });
      },
      async submitForm(formName) {
        let obj = {
          account:this.ruleForm.account,
          pass:md5(this.ruleForm.pass)
        }
        if(await this.valid()){
          Ajax('post','/api/user/signup',obj).then((res)=>{
            if(res.data.code == 200 ){
              if(res.data.token){
                cookie.set('token',res.data.token);
                this.$message({message:'注册成功',type:'success'});
        }else{
                this.$message.error(res.data.message);
              }
            }
          }).catch((err)=>{
            throw err;
          })
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created(){

    }
  }
</script>
