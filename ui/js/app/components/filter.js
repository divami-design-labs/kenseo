var doFilter = function doFilter($container, templateName, realElements){
    var _this = this;
    _this.realobjects = _.cloneDeep(realElements);
    _this.renderTemplate = function(){
        $container.html('');
        _this.realElements.forEach(function(el){
            $container.append(sb.setTemplate(templateName,{data : el} ));
        });
    },
    _this.refresh = function(filteringElements){
        _this.realElements = _.cloneDeep(_this.realobjects);
        for(var filterKey in filteringElements){
            var filterValue = filteringElements[filterKey];
            _this.realElements = _this.realElements.filter(function(item){
                if(typeof filterValue === "string"){
                    return item[filterKey] === filterValue;
                }
                else if(filterValue instanceof RegExp){
                    return filterValue.test(item[filterKey]);
                }else{
                    return filterValue(item);
                }
            });
        }
        return _this.realElements;
        //_this.renderTemplate();
    }
}
