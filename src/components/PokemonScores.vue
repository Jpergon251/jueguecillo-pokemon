<template>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Puntos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, index) in players" :key="index">
          <td>{{ player.name }}</td>
          <td>{{ player.score }}</td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    props: {
        score: {
            type: Number,
            required: true,
        }
    }
  };
  </script>
  
  <style>
  table {
    margin: auto;
    width: 60%;
    border-collapse: collapse;
  }
  
  th,
  td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  
  th {
    background-color: #dddddd;
  }
  </style>
  