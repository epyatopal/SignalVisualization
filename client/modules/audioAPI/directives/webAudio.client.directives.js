(function() {
  'use strict';

  angular
      .module('audioAPI')
      .directive('webAudio', webAudio);

  /* @ngInject */
  function webAudio () {

    var directive = {
      link: link,
      restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {
      var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      var audioElement = document.getElementById('audioElement');
      var audioSrc = audioCtx.createMediaElementSource(audioElement);
      var analyser = audioCtx.createAnalyser();

      // Bind our analyser to the media element source.
      audioSrc.connect(analyser);
      audioSrc.connect(audioCtx.destination);

      var frequencyData = new Uint8Array(scope.audioAPI.resolution);

      //listen change resolution
      scope.$on('resolution', function(){
        frequencyData = new Uint8Array(scope.audioAPI.resolution);
        removeChart();
        createChart();
      });

      var svgHeight = '300';
      var svgWidth = '1200';
      var barPadding = '1';
      var svg;

      function createSvg(parent, height, width) {
        return d3.select(parent).append('svg').attr('height', height).attr('width', width);
      }

      function createChart() {
        svg = createSvg('#svg', svgHeight, svgWidth);

        // Create our initial D3 chart.
        svg.selectAll('rect')
            .data(frequencyData)
            .enter()
            .append('rect')
            .attr('x', function (d, i) {
              return i * (svgWidth / frequencyData.length);
            })
            .attr('width', svgWidth / frequencyData.length - barPadding);
      }

      // Continuously loop and update chart with frequency data.
      function renderChart() {
        requestAnimationFrame(renderChart);

        // Copy frequency data to frequencyData array.
        analyser.getByteFrequencyData(frequencyData);

        // Update d3 chart with new data.
        svg.selectAll('rect')
            .data(frequencyData)
            .attr('y', function(d) {
              return svgHeight - d;
            })
            .attr('height', function(d) {
              return d;
            })
            .attr('fill', function(d) {
              return 'rgb(0, 0, ' + d + ')';
            });
      }

      function removeChart(){
        var t = document.getElementsByTagName('svg')
        t[0].remove()
      }
      // Run the loop
      createChart();
      renderChart();
    }
  }
}).call();