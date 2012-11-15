###
jquery.imgFit.js v.0.2

Copyright (c) Devjam / SHIFTBRAIN INC.  
Licensed under the MIT license.  
https://github.com/devjam

#option
area:null(default:$(this).parent())
maxWidth: null
maxHeight: null
minWidth: null
minHeight: null
align:"center" ["left", "center", "right"]
valign:"middle" ["top", "middle", "bottom"]
autoResize: true

#usage
$("img.fit").imgFit();

#method
resize();
###

do (jQuery) ->
	$ = jQuery
	$.fn.imgFit = (config) ->
		defaultConfig =
			area:null
			maxWidth: null
			maxHeight: null
			minWidth: null
			minHeight: null
			align:"center"
			valign:"middle"
			autoResize: true
		options = $.extend(defaultConfig, config);
		@each () ->
			unless $(@).attr('src')?
				return

			#-----------------------------------------------
			$.fn.imgFit.resize = =>
				o = options
				areaWidth = $(o.area).width()
				areaHeight = $(o.area).height()
				rateWidth =  areaWidth / @srcWidth
				rateHeight = areaHeight / @srcHeight

				if o.maxWidth > 0
					if areaWidth > o.maxWidth
						rateWidth = o.maxWidth / @srcWidth
				if o.minWidth > 0
					if areaWidth < o.minWidth
						rateWidth = o.minWidth / @srcWidth

				if o.maxHeight > 0
					if areaHeight > o.maxHeight
						rateHeight = o.maxHeight / @srcHeight
				if o.minHeight > 0
					if areaHeight < o.minHeight
						rateHeight = o.minHeight / @srcHeight

				rate = rateWidth
				if rateWidth < rateHeight
					rate = rateHeight

				nowWidth = @srcWidth * rate
				nowHeight = @srcHeight * rate
				nowleft = (areaWidth - nowWidth) * 0.5
				nowtop = (areaHeight - nowHeight) * 0.5

				style = 
					width: nowWidth + "px"
					height: nowHeight + "px"

				if o.align == "left"
					style.left = 0
					style.right = "auto"
				else if o.align == "center"
					style.left = nowleft + "px"
					style.right = "auto"
				else
					style.left = "auto"
					style.right = 0

				if o.valign == "top"
					style.top = 0
					style.bottom = "auto"
				else if o.valign == "middle"
					style.top = nowtop + "px"
					style.bottom = "auto"
				else
					style.top = "auto"
					style.bottom = 0
				$(@).css(style)
				@

			init = =>
				@srcWidth = img.width
				@srcHeight = img.height
				o = options
				if o.maxWidth?
					val = o.maxWidth.toString()
					if val.indexOf?("%") != -1
						r = val.replace?("%", "") * 0.01
						o.maxWidth = @srcWidth * r
				if o.minWidth?
					val = o.minWidth.toString()
					if val.indexOf?("%") != -1
						r = val.replace?("%", "") * 0.01
						o.minWidth = @srcWidth * r
				if o.maxHeight?
					val = o.maxHeight.toString()
					if val.indexOf?("%") != -1
						r = val.replace?("%", "") * 0.01
						o.maxHeight = @srcHeight * r
				if o.minHeight?
					val = o.minHeight.toString()
					if val.indexOf?("%") != -1
						r = o.minHeight.replace?("%", "") * 0.01
						o.minHeight = @srcHeight * r
				$(@).imgFit.resize()
				if o.autoResize
					$(window).bind("resize", $(@).imgFit.resize)
				@

			#-----------------------------------------------
			unless options.area?
				options.area = $(@).parent()
			if $(options.area).css("position") == "static"
				$(options.area).css("position", "relative")
			$(@).css("position", "absolute")
			img = new Image()
			img.src = $(@).attr('src')
			if img.complete
				setTimeout =>
					init()
				, 0
			else
				$(img).load =>
				init()
			@
