<template>
    <div>
        <div class="pageloader is-dark" :class="{'is-active': loading}"><span class="title">Getting Students</span></div>
        <table v-if="students" class="table is-dark is-bordered is-striped is-fullwidth" >
            <thead>
            <th>Name</th>
            <th>Email</th>
            <th>Dead</th>
            <th>Target</th>
            </thead>
            <tbody>
            <tr v-for="student in students">
                <td>{{student.FirstName}} {{student.LastName}}</td>
                <td>{{student.Email}}</td>
                <td>{{student.IsDead}}</td>
                <td v-if="student.target">{{student.target.Email}}</td>
            </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "AllStudents",
        data: ()=>{
            return{
                students: null,
                loading: false
            }
        },
        mounted() {
            let _this = this;
            this.loading = false;
            axios.get('https://saapi.excl.dev/admin/students', {
                headers:{
                    'Authorization': 'Bearer ' + _this.$cookies.get("session")
                }
            }).then((response)=>{
                console.log(response)
                _this.loading = false;
                _this.students = response.data
            }).catch((error) =>{
                console.log(error)
            })
        }
    }
</script>

<style scoped>
    td{
        color: black
    }
</style>