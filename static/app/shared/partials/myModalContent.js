<script type="text/ng-template" id="myModalContent.html">
    <div class="modal-header">
        <h3 class="modal-title">I am a modal!</h3>
    </div>
    <div class="modal-body">
        <ul>
            <li ng-repeat="item in items">
                <a ng-click="selected.item = item">{{item.id}}</a>
            </li>
        </ul>
        Patient Name: <b>{{ selected.item.name }}</b>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" ng-click="ok(selected.item.name)">OK</button>
        <button class="btn btn-warning" ng-click="cancel()">Cancel</button>
    </div>
</script>