    const base_url = "https://api.football-data.org/v2/";
    const header = {
        headers:{
            "X-Auth-Token": "d330a8c45e29417e80f5dd039af956b3",
            'Accept-Encoding': ''
        }
    }

    function loadingBar() {
        document.getElementById("table-data").innerHTML = `
            <div class="container center-align" style="position: absolute; margin-top:50%; left:5%;">
                <div class="progress">
                        <div class="indeterminate"></div>
                    </div>
                </div>
        `;
    }

    function fetchDataChampion(data) {
        document.getElementById("table-data").innerHTML = `
            <div class="container center-align" style="position: absolute; margin-top:50%; left:50%;">
                <div class="progress">
                        <div class="indeterminate"></div>
                    </div>
                </div>
        `;
        data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

        let tableHTML = '';
        data.standings.forEach((standing) => {
            if (standing.type === 'TOTAL') {
                        
                let rowHTML = '';

                standing.table.forEach((item) => {    
                    if (item.goalDifference > 0) {
                        item.goalDifference = '+'+ item.goalDifference;
                    }                                                  
                    rowHTML += `
                                <tr>
                                    <td>${item.position}</td>
                                    <td><a href="./detail-team.html?id=${item.team.id}"><img src="${item.team.crestUrl}" alt="flag image" width="30px" /> <span>${item.team.name}</span></a></td>
                                    <td>${item.playedGames}</td>
                                    <td>${item.won}</td>
                                    <td>${item.draw}</td>
                                    <td>${item.lost}</td>
                                    <td>${item.goalsFor}</td>
                                    <td>${item.goalsAgainst}</td>
                                    <td>${item.goalDifference}</td>
                                    <td style="font-weight: bold;">${item.points}</td>
                                </tr>
                            `;                        
                })

                tableHTML += `
                            <div class="container col s12">
                                <h5 class="new badge" style="padding: 10px; background: #3087f1">${standing.group}</h5>
                                <table class="stripped highlight responsive-table">
                                    <thead>
                                        <tr>
                                            <th>Position</th>
                                            <th>Tim</th>
                                            <th>M</th>
                                            <th>M</th>
                                            <th>S</th>
                                            <th>K</th>
                                            <th>GM</th>
                                            <th>GK</th>
                                            <th>+/-</th>
                                            <th>P</th>
                                        </tr>
                                    </thead>
    
                                    <tbody id="matches-${standing.group}">   
                                        ${rowHTML}                         
                                    </tbody>
                                </table>
                            </div>
                        `;
                document.getElementById("table-data").innerHTML = tableHTML;
            }
        });
    }

    function fetchDataLiga(data){        
        data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

        let tableHTML = '';
        data.standings.forEach((standing) => {
            if (standing.type === 'TOTAL') {
                        
                let rowHTML = '';

                standing.table.forEach((item) => {    
                    if (item.goalDifference > 0) {
                        item.goalDifference = '+'+ item.goalDifference;
                    }                                                  
                    rowHTML += `
                                <tr>
                                    <td>${item.position}</td>
                                    <td><a href="./detail-team.html?id=${item.team.id}" style="display: grid; grid-template-columns: auto auto;"><img src="${item.team.crestUrl}" alt="flag image" width="30px" /> <span style="text-align: left;">${item.team.name}</span></a></td>
                                    <td>${item.playedGames}</td>
                                    <td>${item.won}</td>
                                    <td>${item.draw}</td>
                                    <td>${item.lost}</td>
                                    <td>${item.goalsFor}</td>
                                    <td>${item.goalsAgainst}</td>
                                    <td>${item.goalDifference}</td>
                                    <td style="font-weight: bold;">${item.points}</td>
                                </tr>
                            `;                        
                });

                tableHTML += `
                            <div class="container col s12">
                                <table class="stripped highlight responsive-table">
                                    <thead>
                                        <tr>
                                            <th>Position</th>
                                            <th>Tim</th>
                                            <th>M</th>
                                            <th>M</th>
                                            <th>S</th>
                                            <th>K</th>
                                            <th>GM</th>
                                            <th>GK</th>
                                            <th>+/-</th>
                                            <th>P</th>
                                        </tr>
                                    </thead>
    
                                    <tbody id="matches-${standing.group}">   
                                        ${rowHTML}                         
                                    </tbody>
                                </table>
                            </div>
                        `;
                document.getElementById("table-data").innerHTML = tableHTML;
            }
        });  
        return console.log('oke');
    }

    function status(response) {
        if (response.status !== 200) {
            console.log("Error : " + response.status);
            return Promise.reject(new Error(response.statusText));
        } else {
            return Promise.resolve(response);
        }
    }

    function json(response) {
        return response.json();
    }

    function error(error) {
        console.log("Error : " + error);
    }

    function getChampion() {
        if ('caches' in window) {
            caches.match(base_url + "competitions/2001/standings").then((response) => {
                if (response) {
                    response.json().then((data) => {
                        fetchDataChampion(data);
                    });
                }
            });
        }
        fetch(base_url + "competitions/2001/standings", header)
            .then(status)
            .then(json)
            .then((data) => {
                fetchDataChampion(data);
            })
            .catch(error);
    }

    function getJerman() {    
        if ('caches' in window) {            
            caches.match(base_url + "competitions/2002/standings").then((response) => {
                if (response) {
                    response.json().then((data) => {
                        fetchDataLiga(data);
                    });
                }
            });
        }
        fetch(base_url + "competitions/2002/standings", header)
            .then(status)
            .then(json)
            .then((data) => {                
                fetchDataLiga(data);
            })
            .catch(error);
    }

    function getInggris() {        
        if ('caches' in window) {            
            caches.match(base_url + "competitions/2021/standings").then((response) => {
                if (response) {
                    response.json().then((data) => {
                        fetchDataLiga(data);
                    });
                }
            });
        }
        fetch(base_url + "competitions/2021/standings", header)
            .then(status)
            .then(json)
            .then((data) => {
                fetchDataLiga(data);
            })
            .catch(error);
    }

    function getSpanyol() {        
        if ('caches' in window) {            
            caches.match(base_url + "competitions/2014/standings").then((response) => {
                if (response) {
                    response.json().then((data) => {
                        fetchDataLiga(data);
                    });
                }
            });
        }
        fetch(base_url + "competitions/2014/standings", header)
            .then(status)
            .then(json)
            .then((data) => {
                fetchDataLiga(data);
            })
            .catch(error);
    }

    function getPerancis() {        
        if ('caches' in window) {            
            caches.match(base_url + "competitions/2015/standings").then((response) => {
                if (response) {
                    response.json().then((data) => {
                        fetchDataLiga(data);
                    });
                }
            });
        }
        fetch(base_url + "competitions/2015/standings", header)
            .then(status)
            .then(json)
            .then((data) => {
                fetchDataLiga(data);
            })
            .catch(error);
    }

    function getTeamById() {
        return new Promise((resolve, reject) => {
            // Ambil nilai query parameter (?id=)
            let urlParams = new URLSearchParams(window.location.search);
            let idParam = urlParams.get("id");

            if ('caches' in window) {
                caches.match(base_url + "teams/" + idParam).then((response) => {
                    if (response) {
                        document.getElementById("body-content").innerHTML = `
                            <div class="container center-align" style="position: absolute; margin-top:50%; left:5%;">
                                <div class="progress">
                                        <div class="indeterminate"></div>
                                    </div>
                                </div>
                        `;
                        response.json().then((data) => {
                        
                            data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

                            let rowKeeper = '';
                            let rowBek = '';
                            let rowGelandang = '';
                            let rowPenyerang = '';
                            let rowPelatih = '';
                            let rowCompetitions = '';

                            data.activeCompetitions.forEach((competition) => {
                                rowCompetitions += `
                                    <div class="col s12 grey lighten-3" style="margin-bottom: 2px; padding: 10px;">
                                        ${competition.name}
                                    </div>
                                `;
                            });

                            data.squad.forEach((player) => {
                                if (player.role === 'PLAYER' && player.position === 'Goalkeeper') {
                                    rowKeeper += `
                                        <div class="col s12 m6 grey lighten-3" style="margin-bottom: 2px; padding: 10px;">
                                            ${player.name}<br><small>${player.nationality}</small>
                                        </div>
                                    `;
                                } else if (player.role === 'PLAYER' && player.position === 'Defender') {
                                    rowBek += `
                                        <div class="col s12 m6 grey lighten-3" style="margin-bottom: 2px; padding: 10px;">
                                            ${player.name}<br><small>${player.nationality}</small>
                                        </div>
                                    `;
                                } else if (player.role === 'PLAYER' && player.position === 'Midfielder') {
                                    rowGelandang += `
                                        <div class="col s12 m6 grey lighten-3" style="margin-bottom: 2px; padding: 10px;">
                                            ${player.name}<br><small>${player.nationality}</small>
                                        </div>
                                    `;
                                } else if (player.role === 'PLAYER' && player.position === 'Attacker') {
                                    rowPenyerang += `
                                        <div class="col s12 m6 grey lighten-3" style="margin-bottom: 2px; padding: 10px;">
                                            ${player.name}<br><small>${player.nationality}</small>
                                        </div>
                                    `;
                                } else if (player.role === 'COACH') {
                                    rowPelatih += `
                                        <div class="col s12 m6 grey lighten-3" style="margin-bottom: 2px; padding: 10px;">
                                            ${player.name}<br><small>${player.nationality}</small>
                                        </div>
                                    `;
                                }
                            });

                            let kiperHTML = `
                                <div class="row" style="margin:0;">
                                    <div class="col s12 teal darken-4 white-text">
                                        <h3 style="margin-top:5px; margin-bottom:5px;">Kiper</h3>                                   
                                    </div>
            
                                    <div class="col s12" style="padding: 0;">    
                                        ${rowKeeper}                      
                                    </div>
                                </div>`;

                            let bekHTML = `
                                <div class="row" style="margin:0;">
                                    <div class="col s12 teal darken-4 white-text">
                                        <h3 style="margin-top:5px; margin-bottom:5px;">Bek</h3>                                   
                                    </div>
            
                                    <div class="col s12" style="padding: 0;">    
                                        ${rowBek}                      
                                    </div>
                                </div>`;

                            let gelandangHTML = `
                                <div class="row" style="margin:0;">
                                    <div class="col s12 teal darken-4 white-text">
                                        <h3 style="margin-top:5px; margin-bottom:5px;">Gelandang</h3>                                   
                                    </div>
            
                                    <div class="col s12" style="padding: 0;">    
                                        ${rowGelandang}                      
                                    </div>
                                </div>`;

                            let penyerangHTML = `
                                <div class="row" style="margin:0;">
                                    <div class="col s12 teal darken-4 white-text">
                                        <h3 style="margin-top:5px; margin-bottom:5px;">Penyerang</h3>                                   
                                    </div>
            
                                    <div class="col s12" style="padding: 0;">    
                                        ${rowPenyerang}                      
                                    </div>
                                </div>`;

                            let pelatihHTML = `
                                <div class="row" style="">
                                    <div class="col s12 teal darken-4 white-text">
                                        <h3 style="margin-top:5px; margin-bottom:5px;">Pelatih</h3>                                   
                                    </div>
            
                                    <div class="col s12" style="padding: 0;">    
                                        ${rowPelatih}                      
                                    </div>
                                </div>`;

                            let competitionsHTML = `
                                <div class="row" style="">
                                    <div class="col s12 deep-purple darken-4 white-text">
                                        <h3 style="margin-top:5px; margin-bottom:5px;">Kompetisi</h3>                                   
                                    </div>
            
                                    <div class="col s12" style="padding: 0;">    
                                        ${rowCompetitions}                      
                                    </div>
                                </div>`;

                            let team_detail = `
                                <div class="center-align">
                                    <img src="${data.crestUrl}" alt="flag image" width="100px" />
                                    <h5>${data.name}</h5>
                                    <h5>${data.tla}</h5>
                                </div>
                                ${kiperHTML}
                                ${bekHTML}
                                ${gelandangHTML}
                                ${penyerangHTML}
                                ${pelatihHTML}
                                ${competitionsHTML}
                            `;

                            document.getElementById("body-content").innerHTML = team_detail;
                            resolve(data);
                        });
                    }
                });
            }

            fetch(base_url + "teams/" + idParam, header)
                .then(status)
                .then(json)
                .then((data) => {
                    document.getElementById("body-content").innerHTML = `
                        <div class="container center-align" style="position: absolute; margin-top:50%; left:5%;">
                            <div class="progress">
                                <div class="indeterminate"></div>
                            </div>
                        </div>
                    `;
                    
                    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));    
                    
                    let rowKeeper = '';
                    let rowBek = '';
                    let rowGelandang = '';
                    let rowPenyerang = '';
                    let rowPelatih = '';
                    let rowCompetitions = '';

                    data.activeCompetitions.forEach((competition) => {
                        rowCompetitions += `
                            <div class="col s12 grey lighten-3" style="margin-bottom: 2px; padding: 10px;">
                                ${competition.name}
                            </div>
                        `;
                    });

                    data.squad.forEach((player) => {
                        if (player.role === 'PLAYER' && player.position === 'Goalkeeper') {
                            rowKeeper += `
                                <div class="col s12 m6 grey lighten-3" style="margin-bottom: 2px; padding: 10px;">
                                    ${player.name}<br><small>${player.nationality}</small>
                                </div>
                            `;
                        }else if (player.role === 'PLAYER' && player.position === 'Defender') {
                            rowBek += `
                                <div class="col s12 m6 grey lighten-3" style="margin-bottom: 2px; padding: 10px;">
                                    ${player.name}<br><small>${player.nationality}</small>
                                </div>
                            `;
                        }else if (player.role === 'PLAYER' && player.position === 'Midfielder') {
                            rowGelandang += `
                                <div class="col s12 m6 grey lighten-3" style="margin-bottom: 2px; padding: 10px;">
                                    ${player.name}<br><small>${player.nationality}</small>
                                </div>
                            `;
                        }else if (player.role === 'PLAYER' && player.position === 'Attacker') {
                            rowPenyerang += `
                                <div class="col s12 m6 grey lighten-3" style="margin-bottom: 2px; padding: 10px;">
                                    ${player.name}<br><small>${player.nationality}</small>
                                </div>
                            `;
                        }else if (player.role === 'COACH') {
                            rowPelatih += `
                                <div class="col s12 m6 grey lighten-3" style="margin-bottom: 2px; padding: 10px;">
                                    ${player.name}<br><small>${player.nationality}</small>
                                </div>
                            `;
                        }
                    });
                    
                    let kiperHTML = `
                        <div class="row" style="margin:0;">
                            <div class="col s12 teal darken-4 white-text">
                                <h3 style="margin-top:5px; margin-bottom:5px;">Kiper</h3>                                   
                            </div>
    
                            <div class="col s12" style="padding: 0;">    
                                ${rowKeeper}                      
                            </div>
                        </div>`; 

                    let bekHTML = `
                        <div class="row" style="margin:0;">
                            <div class="col s12 teal darken-4 white-text">
                                <h3 style="margin-top:5px; margin-bottom:5px;">Bek</h3>                                   
                            </div>
    
                            <div class="col s12" style="padding: 0;">    
                                ${rowBek}                      
                            </div>
                        </div>`;                    

                    let gelandangHTML = `
                        <div class="row" style="margin:0;">
                            <div class="col s12 teal darken-4 white-text">
                                <h3 style="margin-top:5px; margin-bottom:5px;">Gelandang</h3>                                   
                            </div>
    
                            <div class="col s12" style="padding: 0;">    
                                ${rowGelandang}                      
                            </div>
                        </div>`;                      

                    let penyerangHTML = `
                        <div class="row" style="margin:0;">
                            <div class="col s12 teal darken-4 white-text">
                                <h3 style="margin-top:5px; margin-bottom:5px;">Penyerang</h3>                                   
                            </div>
    
                            <div class="col s12" style="padding: 0;">    
                                ${rowPenyerang}                      
                            </div>
                        </div>`;                      

                    let pelatihHTML = `
                        <div class="row" style="">
                            <div class="col s12 teal darken-4 white-text">
                                <h3 style="margin-top:5px; margin-bottom:5px;">Pelatih</h3>                                   
                            </div>
    
                            <div class="col s12" style="padding: 0;">    
                                ${rowPelatih}                      
                            </div>
                        </div>`; 

                    let competitionsHTML = `
                        <div class="row" style="">
                            <div class="col s12 deep-purple darken-4 white-text">
                                <h3 style="margin-top:5px; margin-bottom:5px;">Kompetisi</h3>                                   
                            </div>
    
                            <div class="col s12" style="padding: 0;">    
                                ${rowCompetitions}                      
                            </div>
                        </div>`;                      

                    let team_detail = `
                        <div class="center-align">
                            <img src="${data.crestUrl}" alt="flag image" width="100px" />
                            <h5>${data.name}</h5>
                            <h5>${data.tla}</h5>
                        </div>
                        ${kiperHTML}
                        ${bekHTML}
                        ${gelandangHTML}
                        ${penyerangHTML}
                        ${pelatihHTML}
                        ${competitionsHTML}
                    `;
                            
                    document.getElementById("body-content").innerHTML = team_detail;
                    resolve(data);
                });
        });
    }

    function getSavedTeams() {
        getAll().then((teams) => {
            let teamsHTML = "";
            if (teams.length > 0) {
                teams.forEach((team) => {
                    teamsHTML += `
                        <div class="card row">
                            <a href="./detail-team.html?id=${team.id}&saved=true">
                                <div class="col s4 card-image waves-effect waves-block waves-light">
                                    <img src="${team.crestUrl}" height="70px" />
                                </div>
                                <div class="card-content col s8">
                                    <span class="card-title truncate" style="margin: 0 auto;">${team.name}</span>
                                </div>
                            </a>
                        </div>
                    `;
                });
                document.getElementById("body-content").innerHTML = teamsHTML;    
            } else {
                teamsHTML += `
                    <div style="margin-top: 50vh;">
                        <h5 class="center-align" style="margin: 0 auto;">Belum ada data tim yang disimpan</h5>
                    </div>
                `;
                document.getElementById("body-content").innerHTML = teamsHTML;    
            }
            
        });
    }

    function getSavedTeamById() {
        return new Promise((resolve, reject) => {
            let urlParams = new URLSearchParams(window.location.search);
            let idParam = urlParams.get("id");

            if ('caches' in window) {
                caches.match(base_url + "teams/" + idParam).then((response) => {
                    if (response) {
                        document.getElementById("body-content").innerHTML = `
                            <div class="container center-align" style="position: absolute; margin-top:50%; left:5%;">
                                <div class="progress">
                                        <div class="indeterminate"></div>
                                    </div>
                                </div>
                        `;
                        response.json().then((data) => {

                            data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

                            let rowKeeper = '';
                            let rowBek = '';
                            let rowGelandang = '';
                            let rowPenyerang = '';
                            let rowPelatih = '';
                            let rowCompetitions = '';

                            data.activeCompetitions.forEach((competition) => {
                                rowCompetitions += `
                                    <div class="col s12 grey lighten-3" style="margin-bottom: 2px; padding: 10px;">
                                        ${competition.name}
                                    </div>
                                `;
                            });

                            data.squad.forEach((player) => {
                                if (player.role === 'PLAYER' && player.position === 'Goalkeeper') {
                                    rowKeeper += `
                                        <div class="col s12 m6 grey lighten-3" style="margin-bottom: 2px; padding: 10px;">
                                            ${player.name}<br><small>${player.nationality}</small>
                                        </div>
                                    `;
                                } else if (player.role === 'PLAYER' && player.position === 'Defender') {
                                    rowBek += `
                                        <div class="col s12 m6 grey lighten-3" style="margin-bottom: 2px; padding: 10px;">
                                            ${player.name}<br><small>${player.nationality}</small>
                                        </div>
                                    `;
                                } else if (player.role === 'PLAYER' && player.position === 'Midfielder') {
                                    rowGelandang += `
                                        <div class="col s12 m6 grey lighten-3" style="margin-bottom: 2px; padding: 10px;">
                                            ${player.name}<br><small>${player.nationality}</small>
                                        </div>
                                    `;
                                } else if (player.role === 'PLAYER' && player.position === 'Attacker') {
                                    rowPenyerang += `
                                        <div class="col s12 m6 grey lighten-3" style="margin-bottom: 2px; padding: 10px;">
                                            ${player.name}<br><small>${player.nationality}</small>
                                        </div>
                                    `;
                                } else if (player.role === 'COACH') {
                                    rowPelatih += `
                                        <div class="col s12 m6 grey lighten-3" style="margin-bottom: 2px; padding: 10px;">
                                            ${player.name}<br><small>${player.nationality}</small>
                                        </div>
                                    `;
                                }
                            });

                            let kiperHTML = `
                                <div class="row" style="margin:0;">
                                    <div class="col s12 teal darken-4 white-text">
                                        <h3 style="margin-top:5px; margin-bottom:5px;">Kiper</h3>                                   
                                    </div>
            
                                    <div class="col s12" style="padding: 0;">    
                                        ${rowKeeper}                      
                                    </div>
                                </div>`;

                            let bekHTML = `
                                <div class="row" style="margin:0;">
                                    <div class="col s12 teal darken-4 white-text">
                                        <h3 style="margin-top:5px; margin-bottom:5px;">Bek</h3>                                   
                                    </div>
            
                                    <div class="col s12" style="padding: 0;">    
                                        ${rowBek}                      
                                    </div>
                                </div>`;

                            let gelandangHTML = `
                                <div class="row" style="margin:0;">
                                    <div class="col s12 teal darken-4 white-text">
                                        <h3 style="margin-top:5px; margin-bottom:5px;">Gelandang</h3>                                   
                                    </div>
            
                                    <div class="col s12" style="padding: 0;">    
                                        ${rowGelandang}                      
                                    </div>
                                </div>`;

                            let penyerangHTML = `
                                <div class="row" style="margin:0;">
                                    <div class="col s12 teal darken-4 white-text">
                                        <h3 style="margin-top:5px; margin-bottom:5px;">Penyerang</h3>                                   
                                    </div>
            
                                    <div class="col s12" style="padding: 0;">    
                                        ${rowPenyerang}                      
                                    </div>
                                </div>`;

                            let pelatihHTML = `
                                <div class="row" style="">
                                    <div class="col s12 teal darken-4 white-text">
                                        <h3 style="margin-top:5px; margin-bottom:5px;">Pelatih</h3>                                   
                                    </div>
            
                                    <div class="col s12" style="padding: 0;">    
                                        ${rowPelatih}                      
                                    </div>
                                </div>`;

                            let competitionsHTML = `
                                <div class="row" style="">
                                    <div class="col s12 deep-purple darken-4 white-text">
                                        <h3 style="margin-top:5px; margin-bottom:5px;">Kompetisi</h3>                                   
                                    </div>
            
                                    <div class="col s12" style="padding: 0;">    
                                        ${rowCompetitions}                      
                                    </div>
                                </div>`;

                            let team_detail = `
                                <div class="center-align">
                                    <img src="${data.crestUrl}" alt="flag image" width="100px" />
                                    <h5>${data.name}</h5>
                                    <h5>${data.tla}</h5>
                                </div>
                                ${kiperHTML}
                                ${bekHTML}
                                ${gelandangHTML}
                                ${penyerangHTML}
                                ${pelatihHTML}
                                ${competitionsHTML}
                            `;

                            document.getElementById("body-content").innerHTML = team_detail;
                            resolve(data);
                        });
                    }
                });
            }
            
            });
    }    