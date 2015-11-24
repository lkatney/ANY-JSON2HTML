# ANY-JSON2HTML [Live Demo](http://any-json2html.lkatney.com)

### Convert any JSON/ARRAY structure easily into html tables using ANY-JSON2HTML library  
== Easy to use, Easily configurable  
== Fast & Reliable  
== Convert any random json/array structure  
== build beautiful tables hence enhancing rading 

## USAGE

Include below scripts as follows

```
<script src="scripts/jquery-1.3.2.debug.js" type="text/javascript"></script>
<script src="scripts/json.htmTable.js" type="text/javascript"></script>
<script src="scripts/json.debug.js" type="text/javascript"></script>
```

Include below css as follows

```
<link href="styles/default.css" rel="stylesheet" type="text/css" />
<link href="styles/main.css" rel="stylesheet" type="text/css" />
```

That's it you are good to go. just call **CreateView** and append it to any div

```
$('#results').append(CreateView(json, "lightPro", true)).fadeIn();
```