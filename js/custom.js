$(function() {
    
    // foreach stopwatch instance
    $('.stopwatch').each(function () {    
        
        // cache elements that are frequently used
        var element = $(this);
        
        var hoursElement = element.find('.hours');
        var minutesElement = element.find('.minutes');
        var secondsElement = element.find('.seconds');
        var millisecondsElement = element.find('.milliseconds');
        
        var toggleElement = element.find('.toggle');
        var resetElement = element.find('.reset');
        
        // state variables
        var hours = minutes = seconds = milliseconds = 0;
        var prevHours = prevMinutes = prevSeconds = prevMilliseconds = 0;
        var timeUpdate;
        
        // Start/Pause/Resume button on mousedown
        toggleElement.button().on('mousedown',function(){
            // Start button
            if($(this).text() == "Start"){  // check button label
                hours = minutes = seconds = milliseconds = 0;
                prevHours = prevMinutes = prevSeconds = prevMilliseconds = 0;
                $(this).html("<span class='ui-button-text'>Pause</span>");
                updateTime();
            }
            // Pause button
            else if($(this).text() == "Pause"){
                clearInterval(timeUpdate);
                $(this).html("<span class='ui-button-text'>Resume</span>");
            }
            // Resume button		
            else if($(this).text() == "Resume"){
                updateTime();
                $(this).html("<span class='ui-button-text'>Pause</span>");
            }
        });
        
        // Reset button on mousedown
        resetElement.button().on('mousedown',function(){
            if(timeUpdate) clearInterval(timeUpdate);
            hours = minutes = seconds = milliseconds = 0;
            prevHours = prevMinutes = prevSeconds = prevMilliseconds = 0;
            setStopwatch(0,0,0,0);
            toggleElement.html("<span class='ui-button-text'>Start</span>");      
        });
        
        // Update time in stopwatch periodically - every 25ms
        function updateTime(){
            var startTime = new Date();    // fetch current time
            
            prevHours = hours;
            prevMinutes = minutes;
            prevSeconds = seconds;
            prevMilliseconds = milliseconds;
            
            timeUpdate = setInterval(function () {
                var timeElapsed = new Date().getTime() - startTime.getTime();    // calculate the time elapsed in milliseconds
                
                // calculate hours: 1000ms * 60s * 60m = 36,00,000ms per hour
                hours = Math.floor((parseInt(timeElapsed, 10) + prevMilliseconds) / 3600000) + prevHours;
                
                // calculate minutes: 1000ms * 60s = 60,000ms per minute
                minutes = Math.floor((parseInt(timeElapsed, 10) + prevMilliseconds) / 60000) + prevMinutes;
                minutes %= 60;
                
                // calculate seconds
                seconds = Math.floor((parseInt(timeElapsed, 10) + prevMilliseconds) / 1000) + prevSeconds;
                seconds %= 60;
                
                // calculate milliseconds 
                milliseconds = timeElapsed + prevMilliseconds;
                milliseconds %= 1000;
                
                // set the stopwatch
                setStopwatch(hours, minutes, seconds, milliseconds);
                
            }, 25); // update time in stopwatch after every 25ms
            
        }
        
        // Set the time in stopwatch
        function setStopwatch(hours, minutes, seconds, milliseconds){
            hoursElement.html(prependZero(hours, 2));
            minutesElement.html(prependZero(minutes, 2));
            secondsElement.html(prependZero(seconds, 2));
            millisecondsElement.html(prependZero(milliseconds, 3));
        }
        
        // Prepend zeros to the digits in stopwatch
        function prependZero(time, length) {
            time = new String(time);    // stringify time
            return new Array(Math.max(length - time.length + 1, 0)).join("0") + time;
        }
    });
    
});