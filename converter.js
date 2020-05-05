//Based on and inspired by Nudua's original framerate converter(Most of the Javascript was taken verbatimBased on and inspired by Nudua's original framerate converter: https://web.archive.org/web/20190109213748/http://nudua.com/convert)
var TimingConverter = function() {
    function n() {
        this.msecPerSecond = 1e3;
        this.msecPerMinute = 6e4;
        this.msecPerHour = 36e5;
        this.msecPerDay = 864e5;
        //this.NESTiming = 60.09881387708959;
        //this.SNESTiming = this.NESTiming;
        this.GBTiming = 59.72750056960583;
        this.SGBTiming = 61.17;
        //this.VBATiming = 60
    }
    return n.prototype.GetTimings = function() {
        return {
        	//I'm putting this up just for SGB conversions, so I'll omit them 
            //"NES/SNES": this.NESTiming,
            "Game Boy/SGB 2/GB Player": this.GBTiming,
            "Super Game Boy": this.SGBTiming,
            //VBA: this.VBATiming
        }
    }, n.prototype.Convert = function(n, t, i) {
        var r = t / i;
        return this.Ratio = r, this.FromMilliseconds(n * r)
    }, n.prototype.Pad = function(n) {
        return n < 10 ? "0" + n : n.toString()
    }, n.prototype.PadMS = function(n) {
        return n < 10 ? "00" + n : n > 10 && n < 100 ? "0" + n : n.toString()
    }, n.prototype.FromMilliseconds = function(n) {
        var i = Math.floor(n / this.msecPerHour % 24),
            r = Math.floor(n / this.msecPerMinute % 60),
            u = Math.floor(n / this.msecPerSecond % 60),
            f = Math.floor(n % 1e3),
            t = this.Pad(r) + ":" + this.Pad(u) + "." + this.PadMS(f);
        return i > 0 && (t = this.Pad(i) + ":" + t), t
    }, n.prototype.Parse = function(n) {
        var u, t, i, f, e, r;
        if (console.info(n), u = n.indexOf("."), t = 0, u != -1 && (i = n.substr(u + 1), parseInt(i) !== 0 && (i.length >= 3 ? t = parseInt(i.substr(0, 3)) : i.length === 2 ? t = parseInt(i + "0") : i.length === 1 && (t = parseInt(i + "00"))), n = n.substr(0, u)), n.indexOf(":") === -1) return f = parseInt(n), e = f * this.msecPerSecond, e + t;
        if (r = n.split(":"), r.length === 2) {
            var o = parseInt(r[0]),
                f = parseInt(r[1]),
                e = o * this.msecPerMinute + f * this.msecPerSecond;
            return e + t
        }
        if (r.length === 3) {
            var s = parseInt(r[0]),
                o = parseInt(r[1]),
                f = parseInt(r[2]),
                e = s * this.msecPerHour + o * this.msecPerMinute + f * this.msecPerSecond;
            return t != 0 && t < 100 && (t *= 10), e + t
        }
        return 0
    }, n
}();


window.onload=function(){
    function t(){
        var t=$("#SourceTime").val(),
        i=$("#SourceFramerate").val(),
        r=$("#DestFramerate").val(),
        u=n.Parse(t),
        f=n.Convert(u,i,r);
        $("#RatioBlock").text(n.Ratio);
        $("#ResultBlock").text(f);
        $("#HiddenWell").removeClass("hide")
    }
	var n=new TimingConverter,i=n.GetTimings();
	$.each(i,function(n,t){
		$("#DestFramerateSelect").append($("<option>",{value:t}).text(n));
		$("#SourceFramerateSelect").append($("<option>",{value:t}).text(n))
	});
	$("#DestFramerateSelect").change(function(){
		$("#DestFramerate").val(this.value);
		$("#SourceTime").val()&&t()
	});
	$("#SourceFramerateSelect").change(function(){
		$("#SourceFramerate").val(this.value);
		$("#SourceTime").val()&&t()
	});
	$("#SourceFramerateSelect").val(n.SGBTiming.toString());
	$("#SourceFramerate").val(n.SGBTiming.toString());
	$("#DestFramerateSelect").val(n.GBTiming.toString());
	$("#DestFramerate").val(n.GBTiming.toString());
	$("#ConvertButton").click(function(){t()
	})
}