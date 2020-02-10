<template>
    <div>
        <table class="table is-dark is-bordered is-striped is-fullwidth" >
            <thead>
            <th>Image</th>
            <th>Assassin</th>
            <th>Target</th>
            <th>Approve</th>
            <th>Deny</th>
            </thead>
            <tbody>
                <tr v-for="kill in kills">
                <td><a :href="kill.url"><img style="width: 10vw" :src="kill.url" alt=""></a></td>
                <td>{{kill.assassin_email}}</td>
                <td>{{kill.target_email}}</td>
                    <td><button @click="confirmApprove(kill.uuid)" class="button is-primary">Approve</button></td>
                    <td><button @click="confirmDeny(kill.uuid)" class="button is-danger">Danger</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import axios from 'axios'
    import Swal from 'sweetalert2/src/sweetalert2.js'
    export default {
        name: "PendingKills",
        data:()=>{
            return{
                kills: {},
            }
        },
        mounted() {
            let _this = this;

            axios.get('https://saapi.excl.dev/admin/kills', {
                headers:{
                        'Authorization': 'Bearer ' + _this.$cookies.get("session")
                }
            }).then((response)=>{
                console.log(response)
                    _this.kills = response.data.data
            }).catch((error) =>{
                console.log(error)
            })
        },
        methods:{
            confirmApprove(id){
                let _this = this;
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes Approve it'
                }).then((result) => {
                    if (result.value) {
                    _this.approveKill(id)
                        }
                })
            },
            confirmDeny(id){
                let _this = this;
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, deny it!'
                }).then((result) => {
                    if (result.value) {
                    _this.denyKill(id)
                }
                })
            },

            approveKill(id){
                let _this = this;
                axios.post('https://saapi.excl.dev/admin/kills', {
                    uuid: id
                }, {
                    headers:{
                        'Authorization': 'Bearer ' + _this.$cookies.get("session")
                    }
                }).then((response)=>{
                    console.log(response)
                    Swal.fire('Kill Approved', 'Kill Confirmed', 'success')

                }).catch(()=>{
                    Swal.fire('Error', 'Something Went Wrong', 'error')
                })
            },
            denyKill(id){
                let _this = this;
                axios.delete('https://saapi.excl.dev/admin/kills/' + id, {
                    headers:{
                        'Authorization': 'Bearer ' + _this.$cookies.get("session")
                    }
                }).then((response)=>{
                    console.log(response)
                    Swal.fire('Kill Deleted', 'Kill Confirmed', 'success')

                }).catch(()=>{
                    Swal.fire('Error', 'Something Went Wrong', 'error')
                })
            }
        }
    }
</script>

<style scoped>
td{
    color: black;
}
</style>