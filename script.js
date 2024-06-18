
    document.getElementById('my-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    var form = event.target;
    var formData = new FormData(form);

    fetch('https://script.google.com/macros/s/AKfycbz1OAv4cTXdx2qtwi-KLTj5Y46cuNBZFtOJKnkqz1zDOfzPFd-5Vb9O_K5dKMvNDHeUoQ/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if(response.ok) {
            alert("Insert successful!");
            window.location.reload(); // Reload the page
            
            // Optionally, you can redirect to another page here
            //window.location.href = "test.html";
        } else {
            throw new Error('Insert failed');
        }
    })
    .catch(error => {
        console.error('Error!', error.message);
        // Handle error - for example, show an error message to the user
        alert("Insert failed. Please try again later.");
    });
});


        function calculateTotalHours() {
            var zerothModuleHours = parseFloat(document.querySelector('input[name="zerothModuleHours"]').value) || 0;
            var courseContentDeliveryHours = parseFloat(document.querySelector('input[name="courseContentDeliveryHours"]').value) || 0;
            var internalTestHours = parseFloat(document.querySelector('input[name="internalTestHours"]').value) || 0;
            
            var totalHours = zerothModuleHours + courseContentDeliveryHours + internalTestHours;
            document.querySelector('input[name="totalHours"]').value = totalHours;
        }

        document.addEventListener('DOMContentLoaded', function() {
            // Add event listeners to update the total hours when input changes
            document.querySelector('input[name="courseContentDeliveryHours"]').addEventListener('input', calculateTotalHours);
            document.querySelector('input[name="internalTestHours"]').addEventListener('input', calculateTotalHours);
            
            // Initialize the total hours calculation on page load
            calculateTotalHours();
        });
        // Event listener for Course Objectives dropdown
        document.getElementById('CourseObjectives').addEventListener('change', function() {
    var objectivesCount = parseInt(this.value);
    var container = document.getElementById('courseObjectivesContainer');
    container.innerHTML = ''; // Clear the container

    // Create the table
    var table = document.createElement('table');
    table.setAttribute('border', '1');
    table.style.width = '100%';

    // Create the header row
    var headerRow = document.createElement('tr');
    var headers = ['Sl No', 'Course Objective', 'Cognitive Level', 'Knowledge Category'];
    headers.forEach(function(headerText) {
        var header = document.createElement('th');
        header.innerText = headerText;
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    // Create the objective rows
    for (var i = 1; i <= objectivesCount; i++) {
        var row = document.createElement('tr');

        // Sl No
        var slNoCell = document.createElement('td');
        slNoCell.innerText = i;
        row.appendChild(slNoCell);

        // Course Objective
        var objectiveCell = document.createElement('td');
        var objectiveInput = document.createElement('input');
        objectiveInput.setAttribute('name', 'Objective_' + i);
        objectiveInput.setAttribute('type', 'text');
        objectiveInput.setAttribute('placeholder', 'Objective ' + i);
        objectiveInput.required = true;
        objectiveCell.appendChild(objectiveInput);
        row.appendChild(objectiveCell);

        // Cognitive Level
        var cognitiveCell = document.createElement('td');
        var cognitiveSelect = document.createElement('select');
        cognitiveSelect.setAttribute('name', 'CognitiveLevel_' + i);
        ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].forEach(function(level) {
            var option = document.createElement('option');
            option.setAttribute('value', level);
            option.innerText = level;
            cognitiveSelect.appendChild(option);
        });
        cognitiveCell.appendChild(cognitiveSelect);
        row.appendChild(cognitiveCell);

        // Knowledge Category
        var knowledgeCell = document.createElement('td');
        var knowledgeSelect = document.createElement('select');
        knowledgeSelect.setAttribute('name', 'KnowledgeCategory_' + i);
        ['K1', 'K2', 'K3', 'K4'].forEach(function(category) {
            var option = document.createElement('option');
            option.setAttribute('value', category);
            option.innerText = category;
            knowledgeSelect.appendChild(option);
        });
        knowledgeCell.appendChild(knowledgeSelect);
        row.appendChild(knowledgeCell);

        // Add the row to the table
        table.appendChild(row);
    }

    // Append the table to the container
    container.appendChild(table);
});


        // Event listener for Course Outcomes dropdown
        document.getElementById('CourseOutcomes').addEventListener('change', function() {
            var outcomesCount = parseInt(this.value);
            var container = document.getElementById('courseOutcomesContainer');
            container.innerHTML = '';
            for (var i = 1; i <= outcomesCount; i++) {
                container.innerHTML += '<input name="Outcome_' + i + '" type="text" placeholder="CO' + i + '" required><br>';
            }

            // Generate grids along with the dropdown selection of course outcomes
            var objectiveCount = parseInt(document.getElementById('CourseObjectives').value);
            var outcomeCount = parseInt(document.getElementById('CourseOutcomes').value);

            createAndPopulateCoPoMappingGrid(outcomeCount);
            createAndPopulateCopSoMappingGrid(outcomeCount);
            
        });

        // Function to create and populate COPO Mapping Grid
        function createAndPopulateCoPoMappingGrid(outcomeCount) {
            var coPoMappingGrid = document.getElementById('coPoMappingGrid');
            coPoMappingGrid.innerHTML = ''; // Clear previous content
            // Generate grid rows
            var html = '<h4>CO-PO Mapping Grid:</h4><tr><th>CO / PO</th>';
            for (var i = 1; i <= 12; i++) { // Assuming there are always 12 POs
                html += '<th>PO' + i + '</th>';
            }
            html += '</tr>';
            for (var i = 1; i <= outcomeCount; i++) {
                html += '<tr><td>CO' + i + '</td>';
                for (var j = 1; j <= 12; j++) { // Assuming there are always 12 POs
                    html += '<td style="width: 80px;height: auto"><select name="COPO_' + i + '_PO' + j + '" ><option value="-" selected>-</option><option value="1">1</option><option value="2">2</option><option value="3">3</option></select></td>';
                }
                html += '</tr>';
            }
            coPoMappingGrid.innerHTML = html;
        }

        // Function to create and populate COPSO Mapping Grid
        function createAndPopulateCopSoMappingGrid(outcomeCount) {
            var copSoMappingGrid = document.getElementById('copSoMappingGrid');
            copSoMappingGrid.innerHTML = ''; // Clear previous content
            // Generate grid rows
            var html = '<h3>CO-PSO Mapping Grid:</h3><tr><th>CO / PSO</th>';
            for (var i = 1; i <= 3; i++) { // Assuming there are always 3 PSOs
                html += '<th>PSO' + i + '</th>';
            }
            html += '</tr>';
            for (var i = 1; i <= outcomeCount; i++) {
                html += '<tr><td>CO' + i + '</td>';
                for (var j = 1; j <= 3; j++) { // Assuming there are always 3 PSOs
                    html += '<td><select name="COPSO_' + i + '_PSO' + j + '" ><option value="-" selected>-</option><option value="1">1</option><option value="2">2</option><option value="3">3</option></select></td>';
                }
                html += '</tr>';
            }
            copSoMappingGrid.innerHTML = html;
        }

        document.getElementById('ModuleCount').addEventListener('change', function() {
    var ModuleCount = parseInt(this.value);
    var container = document.getElementById('moduleContainer');
    container.innerHTML = '';
    
    for (var i = 1; i <= ModuleCount; i++) {
        container.innerHTML += `
            <div class="module">
                <label for="modTitle_${i}">Module ${i} Title</label>
                <input type="text" id="modTitle_${i}" name="Module_${i}_Title" required><br>
                
                <label for="modContent_${i}">Module ${i} Contents</label>
                <textarea id="modContent_${i}" name="Module_${i}_Content" rows="4" cols="50" placeholder="Use '-' as separator between individual topics" required></textarea><br>
                
                <label for="modCO_${i}">CO's mapped to Module ${i}</label>
                <input type="text" id="modCO_${i}" name="Module_${i}_CO" placeholder="CO1, CO2, ..." required><br>
                
                <label for="modHours_${i}">Number of Hours required for Module ${i}</label>
                <input type="number" id="modHours_${i}" name="Module_${i}_Hours" required><br>
            </div>
            <br>
        `;
    }
    
    var outcomeCount = parseInt(document.getElementById('CourseOutcomes').value);
   /*  createCoursePlanGrid(outcomeCount, ModuleCount); */
});

        document.getElementById('ReferenceCount').addEventListener('change', function() {
            var ReferenceCount = parseInt(this.value);
            var container = document.getElementById('referenceContainer');
            container.innerHTML = '';
            for (var i = 1; i <= ReferenceCount; i++) {
                container.innerHTML += '<input name="Reference_' + i + '" type="text" placeholder="Reference ' + i + '" required><br>';
            }
        });
        document.getElementById('TextbookCount').addEventListener('change', function() {
            var TextbookCount = parseInt(this.value);
            var container = document.getElementById('textbookContainer');
            container.innerHTML = '';
            for (var i = 1; i <= TextbookCount; i++) {
                container.innerHTML += '<input name="Textbook_' + i + '" type="text" placeholder="Textbook ' + i + '" required><br>';
            }
        });

        document.getElementById('addRowBtn').addEventListener('click', function() {
            createCoursePlanRow();
        });

   
        // Function to create a new row in the course plan grid
        function createCoursePlanRow() {
            var table = document.getElementById('coursePlanGrid');
            var newRow = table.insertRow(table.rows.length);
            newRow.innerHTML = '<td><select name="Module_' + (table.rows.length - 1) + '">' + generateModuleOptions() + '</select></td>' +
                                '<td><input name="Topic_' + (table.rows.length - 1) + '" type="text" placeholder="Topic" required></td>' +
                                '<td><select name="CO_' + (table.rows.length - 1) + '">' + generateCOOptions() + '</select></td>' +
                                '<td><input name="Hours_' + (table.rows.length - 1) + '" type="text" placeholder="Number of Hours" required></td>';
        }

        // Function to generate module options
        function generateModuleOptions() {
            var moduleCount = document.getElementById('ModuleCount').value;
            var options = '';
            for (var i = 1; i <= moduleCount; i++) {
                options += '<option value="' + i + '">Module ' + i + '</option>';
            }
            return options;
        }

        // Function to generate CO options
        function generateCOOptions() {
            var outcomeCount = document.getElementById('CourseOutcomes').value;
            var options = '';
            for (var i = 1; i <= outcomeCount; i++) {
                options += '<option value="CO' + i + '">CO' + i + '</option>';
            }
            return options;
        }
   
   